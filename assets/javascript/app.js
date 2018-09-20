// variables for number of correct and wrong answers
var correctCount = 0;
var incorrectCount = 0;
var unanswered = 0;


// function to show questions on button start click
function showQuiz() {
  // hide start screen
  $("#start-screen").attr("style", "display: none")


  // show the questions and answer choices



  for (var i = 0; i < questionSet.length; i++) {
    $("#quiz-screen").append("<div>" + questionSet[i].question + "</div>");
    
    

  }





}


$("#start-button").click()


// function to create timer



// function to check answers and show results 


// function to reset