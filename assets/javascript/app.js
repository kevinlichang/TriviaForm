$(document).ready(function () {
  // variables for number of correct and wrong answers
  var correctCount = 0;
  var incorrectCount = 0;
  var unanswered = 0;



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
        choicesInput.attr("type", "radio");
        choicesInput.attr("name", questionSet[i].questNumber);
        choicesInput.attr("value", data);
        $("#quiz-questions").append(choicesInput);

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




  // function to create timer



  // function to check answers and show results 

  function checkAnswers() {
    //created variables to acquire value of checked radio inputs
    var checkedAnsValues = [
      $('input[name="0"]:checked').val(),
      $('input[name="1"]:checked').val(),
      $('input[name="2"]:checked').val(),
      $('input[name="3"]:checked').val()
    ];
    console.log(checkedAnsValues);

    // if there is unanswered and time remaining 
    if (checkedAnsValues.includes(undefined) === true) {
      alert("You have not answered all the questions.")
      return false
    }


    // checked the checked answer value with the answer in questionSet array
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
    $("#unanswered").text("Questions you missed: " + unanswered);
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

  });


  



});