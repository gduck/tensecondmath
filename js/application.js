
jQuery(document).ready(function() {

  var numberLimit = 20;
  var timeLeft = 10;
  var timerOn = false;
  var processNumber;
  var answeredRight = 0;
  //var answer = eval($('#question').text());
  var operator = 'add';
  var questionAndAnswer = {};

  var opArray = $('#div-operations :checked');
  
  var getRandomOp = function () {
    opArray = $('#div-operations :checked');
    var randomOp = Math.floor(Math.random() * opArray.length);
    operator = opArray[randomOp].value;
    console.log("we just got a random op " + operator);
    return operator;
  }

  var getRandomInt = function (maxNumber) {
    return Math.round(Math.random() * maxNumber);
  }

  var getQuestion = function (maxNum, op) {
    var num1 = getRandomInt(maxNum);
    var num2 = getRandomInt(maxNum);
    var questionAndAnswer = {};

    switch (op) {
      case 'add':
        var question = num1 + " + " + num2;
        questionAndAnswer = {
          question: question,
          answer: eval(question)
        };
        break;
      case 'sub':
        var question = num1 + " - " + num2;
        questionAndAnswer = {
          question: question,
          answer: eval(question)
        };
        break;
      case 'mul':
        var question = num1 + " * " + num2;
        questionAndAnswer = {
          question: question,
          answer: eval(question)
        };
        break;
      case 'div':
        while (num2 == 0) {num2 = getRandomInt(maxNum);}
        num1 = Math.round(num1 / 2);
        var question = num1*num2 + " / " + num2;
        questionAndAnswer = {
          question: question,
          answer: eval(question)
        };
        break;
      case 'pow':
        num1 = Math.round((num * 3)/4);
        var question = num1 + " ^ 2";
        questionAndAnswer = {
          question: question,
          answer: Math.pow(num1, 2)
        };
        break;
      case 'sqrt':
        num1 = Math.round(num1 / 2);
        var question = "sqrt "+ Math.pow(num1,2);
        questionAndAnswer = {
          question: question,
          answer: Math.pow(Math.pow(num1,2), .5)
        };
        break;
     }
     console.log("here at the end of the switch");
    console.log(questionAndAnswer.question);
    $('#question').text(questionAndAnswer.question);
    return questionAndAnswer;
  }

  var refreshQuestion = function () {
    operator = getRandomOp();
    console.log("operator is "+ operator);
    questionAndAnswer = getQuestion(numberLimit, operator);
    answer = questionAndAnswer.answer;
  }

  var cleanInput = function () {
    $('#question-answer').val("");
  }

  var timeout_trigger = function () {
    if (timeLeft > 0) {
      timeLeft -= 1;
      $('#time-left').text(timeLeft);
    } else {
      clearInterval(processNumber);
      $('#questionbox').addClass("invisible");
      $('#timebox').addClass("invisible");
      $('#start-quiz').removeClass("invisible");
      $('#results-box').removeClass("invisible");
      $('#score').text(answeredRight);
    }
  }

  var timeout_init = function () {
    if (!timerOn) {
      processNumber = setInterval(timeout_trigger, 1000);
      console.log("new process "+processNumber);
      timerOn = true;
    }
  }

  var initialise = function () {
    timerOn = false;
    answeredRight = 0;
    refreshQuestion();
    cleanInput();
    timeLeft = 10;
    $('#time-left').text(timeLeft);
  }
  initialise();


  $('#question-answer').on("keyup", function() {
    var getAnswer = $('#question-answer').val();
    answer = questionAndAnswer.answer;    
    if (getAnswer == answer) {
      answeredRight +=1;
      timeLeft++;
      timeout_init();
      cleanInput();
      refreshQuestion();
    }
  });

  $(document).on("click", "#start-quiz", function () {
      initialise();
      $('#questionbox').removeClass("invisible");
      $('#timebox').removeClass("invisible");
      $('#start-quiz').addClass("invisible");
      $('#results-box').addClass("invisible");
  });

   $( "#div-operations :checkbox" ).on( "click", function () {
    opArray = $('#div-operations :checked');
    var randomOp = Math.floor(Math.random() * opArray.length);
    operator = opArray[randomOp].value;
    console.log(operator);
   });


  $(function() {
    $( "#slider-range-max" ).slider({
      range: "max",
      min: 10,
      max: 100,
      value: numberLimit,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
        numberLimit = ui.value;
        refreshQuestion();
      }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  });

//  $( "#slider-range-max" ).on("change", function() {
//    numberLimit = $( "#slider-range-max" ).slider( "value" );
//    console.log(numberLimit);
//  })


});  // end document ready

