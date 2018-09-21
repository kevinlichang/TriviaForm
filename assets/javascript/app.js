$(document).ready(function () {
  // variables for number of correct and wrong answers
  var correctCount = 0;
  var incorrectCount = 0;
  var unanswered = 0;


  // create questions in quiz-questions
  function displayQuestions() {

    for (var i = 0; i < questionSet.length; i++) {
      // variables to create div. add text and append to html
      var questionDiv = $("<div>");
      questionDiv.text(questionSet[i].question);
      $("#quiz-questions").append(questionDiv);

      // function to create radio inputs and labels for multiple choice
      // add attribute type=radio, name, and value as the answer.
      function addInput(data) {
        var choicesInput = $("<input>");
        choicesInput
          .attr({type: "radio", name: i, value: data})
          .appendTo("#quiz-questions");

        var choicesLabel = $("<label>");

        choicesLabel.text(data);
        $("#quiz-questions").append(choicesLabel);

      };

      // Run addInput function to add 4 multiple choices for each question
      addInput(questionSet[i].choicesArray[0]);
      addInput(questionSet[i].choicesArray[1]);
      addInput(questionSet[i].choicesArray[2]);
      addInput(questionSet[i].choicesArray[3]);

    };

  };



  // function to show questions on button start click
  $("#start-button").click(function () {
    // hide start screen
    $("#start-screen").attr("style", "display: none");

    // show #quiz-container
    $("#quiz-container").removeAttr("style");

    // show questions and choices
    displayQuestions();

  });


  // function to check answers and show results 

  function checkAnswers() {
    //created variables to acquire value of checked radio inputs
    var checkedAnsValues = [
      $('input[name="0"]:checked').val(),
      $('input[name="1"]:checked').val(),
      $('input[name="2"]:checked').val(),
      $('input[name="3"]:checked').val(),
      $('input[name="4"]:checked').val(),
      $('input[name="5"]:checked').val()
    ];
    console.log(checkedAnsValues);

    // if there is unanswered and time remaining 
    if (checkedAnsValues.includes(undefined) === true) {
      alert("You have not answered all the questions.")
      return false
    }


    // check the checked answer value with the answer in questionSet array
    // increase correctCount and incorrect Count based on comparison

    for (var i = 0; i < questionSet.length; i++) {
      if (checkedAnsValues[i] === questionSet[i].answer) {
        correctCount++;
      } else if (checkedAnsValues[i] === undefined) {
        unanswered++;
      
      } else if (checkedAnsValues[i] !== questionSet[i].answer ) {
        incorrectCount++;
      };
    };
    console.log("unanswered: " + unanswered);


    // hide quiz container and show results 
    $("#quiz-container").attr("style", "display: none");
    $("#results-container").removeAttr("style");

    // write results to the results div
    
    $("#correctAns").text("Questions you got correct: " + correctCount);
    $("#wrongAns").text("Questions you got wrong: " + incorrectCount);
    if (unanswered > 0) {
      $("#unanswered").text("Questions you missed: " + unanswered);
    };
  };


  // on click function for finished button to run checkAnswers()
  $("#finished-button").click(function() {
    checkAnswers();
    
  });


  // function to reset
  $("#reset-button").click(function() {

    // show start screen and hide results screen
    $("#results-container").attr("style", "display: none");
    $("#start-screen").removeAttr("style");

    // reset counters to 0
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;

    // remove quiz-questions contents
    $("#quiz-questions").empty();
    timeReset();

  });



  // Need to create timer to display
  // variables for time
  var timeLeft = 60;

  function timeReset() {
   time = 0;

   $("#show-timer").text("01:00");

  };

  function timeStart() {
    intervalId = setInterval(countdown, 1000);
  }

  function timeStop() {

    console.log("stopping");
    clearInterval(intervalId);

  }




  function countdown() {

    time--;
    var converted = timeConverter(time);
    $("#show-timer").text(converted);

  }

  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
    minutes = "00";
    } else if (minutes < 10) 
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
// }


  



});