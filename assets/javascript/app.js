$(document).ready(function () {
  // variables for number of correct and wrong answers
  var correctCount = 0;
  var incorrectCount = 0;
  var unanswered = 0;


  // create questions in quiz-questions
  function displayQuestions() {

    for (var i = 0; i < questionSet.length; i++) {
      // variables to create div add text and append to html
      var questionDiv = $("<div>");

      var questionText = $("<h5>");
      questionText.text(questionSet[i].question);
      questionDiv.append(questionText);

      // function to create radio inputs and labels for multiple choice
      // add attribute type=radio, name, and value as the answer.


      for (var y = 0; y < questionSet[i].choicesArray.length; y++) {
        
        var radioDiv = $("<div>");
  
        var radioInput = $("<input>");
        radioInput.attr({type: "radio", name: i, value: questionSet[i].choicesArray[y]})
        var labels = $("<label>");
        labels.text(questionSet[i].choicesArray[y]);

        radioDiv.append(radioInput, labels);
        questionDiv.append(radioDiv);
      };

      $("form").append(questionDiv);
    };
  };


  // function to show questions on *START* button click
  $("#start-button").click(function () {
    
    // hide start screen
    $("#start-screen").attr("style", "display: none");

    // show #quiz-container
    $("#quiz-container").removeAttr("style");

    displayQuestions();

    // start timer display and set window timer
    timeReset();
    timeStart();
    setWindowTimer();
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
      $('input[name="5"]:checked').val(),
      $('input[name="6"]:checked').val(),  
      $('input[name="7"]:checked').val(),  
      $('input[name="8"]:checked').val(),
      $('input[name="9"]:checked').val(),
      $('input[name="10"]:checked').val(),      
      $('input[name="11"]:checked').val()      
    ];


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


  // on click function for ** button to run checkAnswers()
  $("#finished-button").click(function() {
    checkAnswers();
    timeStop();
    stopWindowTimer();
        
  });

  ///////////////////////////////////
  // function to reset the page to start screen
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
    $("#unanswered").empty();
    timeReset();
  });



  ////////////////// Create timer to display
  // variables for time
  var timeLeft = 120;
  var windowTimer;

  function setWindowTimer() {
    windowTimer = setTimeout(function() {
      timeStop();
      checkAnswers();
      alert("Times Up!");
    }, 
    120000);
  };

  function stopWindowTimer() {
    clearTimeout(windowTimer);
  };

  function timeReset() {
   timeLeft = 120;

   $("#show-timer").text("02:00");

  };

  function timeStart() {
    intervalId = setInterval(countdown, 1000);
  };

  function timeStop() {

    console.log("stopping");
    clearInterval(intervalId);

  };

  function countdown() {

    timeLeft--;
    var converted = timeConverter(timeLeft);
    $("#show-timer").text(converted);

  };

  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    };

    if (minutes === 0) {
    minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    };
    return minutes + ":" + seconds;
  };


  



});