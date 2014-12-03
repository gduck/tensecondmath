
jQuery(document).ready(function() {

  var numberLimit = 20;
  var timeLeft = 10;
  var number1 = Math.random();
  var number2 = Math.random();
  var questionNumber1; //= Math.round(number1 * numberLimit);
  var questionNumber2; //= Math.round(number2 * numberLimit);
  var timerOn = false;
  var processNumber;
  var answeredRight = 0;
  var answer = eval($('#question').text());

  var opArray = $('#div-operations :checked');
  console.log(opArray[0]);
  
  var refreshQuestion = function () {
    number1 = Math.random();
    number2 = Math.random();
    questionNumber1 = Math.round(number1 * numberLimit);
    questionNumber2 = Math.round(number2 * numberLimit);
    console.log("here in refreshQuestion")
    $('#question').text(questionNumber1 + " + " +  questionNumber2);
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
    answer = eval($('#question').text());
    cleanInput();
    timeLeft = 10;
    $('#time-left').text(timeLeft);
  }
  initialise();


  $('#question-answer').on("keyup", function() {
    var getAnswer = $('#question-answer').val();
    answer = eval($('#question').text());    
    if (getAnswer == answer) {
      answeredRight +=1;
      console.log("good answer, timeout triggered");
      // 1 second added, timer triggered for first time
      timeLeft += 1;
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
  //   if ($('#div-operations :checked').length() == 0) {
  //     $('#div-operations :checkbox')[0].checked(true);
  //   }
     getArray ();
   }


  var getArray = function () {
    opArray = $('#div-operations :checked');
  }

  var getQuestion = function (questionNumber1, questionNumber2, operand) {

    var question = "";
    switch (operand) {
      case 'add':
        question = questionNumber1 + " + " + questionNumber2;
        console.log("add");
        break;
      case 'sub':
        question = questionNumber1 + " - " + questionNumber2;
        console.log("sub");
        break;
      case 'pow':
        question = Math.pow(questionNumber1, 2).toString();
        console.log("power");
        break;
    }
    return question;
  }
  refreshQuestion('add');


  $(function() {
    $( "#slider-range-max" ).slider({
      range: "max",
      min: 10,
      max: 100,
      value: numberLimit,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
        numberLimit = ui.value;
        console.log(numberLimit);
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

