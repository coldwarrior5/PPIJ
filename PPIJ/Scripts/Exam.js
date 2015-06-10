﻿var idArea = 0;
var noClass = 1;
var idSubject = 0;
var questionNumber = -1;
var correctAnswer = 0;
var chosenNumQuestions = 0;
var minNumQuestions = 10;
var maxNumQuestions = 30;
var RandomizeArray = [];
$(document).ready(function () {
    var questionBank = new Array();
    var correct = new Array();
    var stage = "#game1";
    var stage2 = new Object;
    var questionLock = false;
    var score = 0;
    var logged = $('#logged').val();
    var exam = true;
    var area = true;
    var priorityNew = true; 
    var numberOfQuestions = 0;
    var userChoice = new Array();
    var choiceNumber = 0;

    if (logged=="true") {
        choiceNumber = 0
        displayOptions("Novi ispit", "Stari ispiti");
    }
    else {
        choiceNumber = 1;
        displayOptions("Kartice za učenje", "Ispit");
    }/*
    $.getJSON('../../Scripts/activity.json', function (data) {
        answered = data.answered;
        for (i = 0; i < data.quizlist.length; i++) {
            questionBank[i] = new Array;
            questionBank[i][0] = data.quizlist[i].question;
            questionBank[i][1] = data.quizlist[i].option1;
            questionBank[i][2] = data.quizlist[i].option2;
            questionBank[i][3] = data.quizlist[i].option3;
			correct[i] = parseInt(data.quizlist[i].trueAnswer);
        }
        numberOfQuestions = questionBank.length;

        displayQuestion(3);
        })
      
      */
    function displayQuestion() {
        var questionPicture = new Array(questionBank[currentQuestion][5].length);
        for(var i = 0; i<questionBank[currentQuestion][5].length; i++)
        {
            if(questionBank[currentQuestion][5][i][3]=="True")
            {
                correctAnswer=i;
            }
        }
        $(stage).append('<div class="questionText">' + questionBank[currentQuestion][1] + '<br/><br/>' + questionBank[currentQuestion][3]);
        if (questionBank[currentQuestion][2] != "null")
        {
            $(stage).append('<br/><img src="../../Images/Exam/' + questionBank[currentQuestion][2]+'.jpg"/><br/>');
        }
        var questionArray = new Array(questionBank[currentQuestion][5].length);
        for (var iterate = 0; iterate < questionBank[currentQuestion][5].length; iterate++) {
            while (true) {
                var rnd = Math.random() * questionBank[currentQuestion][5].length;
                rnd = Math.ceil(rnd);
                if (typeof questionArray[rnd] === 'undefined') {
                    if (correctAnswer === iterate) {
                        correct[currentQuestion] = rnd;
                    }
                    questionArray[rnd] = questionBank[currentQuestion][5][iterate][1];
                    if (questionBank[currentQuestion][5][iterate][2] != "null")
                    {
                        questionPicture[rnd] = questionBank[currentQuestion][5][iterate][2]
                    }
                    else {
                        questionPicture[rnd] = "";
                    }
                    break;
                }
            }
        }
        for (var iterate = 1; iterate <= questionBank[currentQuestion][5].length; iterate++) {
            if (questionArray[iterate] == "") {
                $(stage).append('<img id="' + iterate + '"class="picture" src="../../Images/Exam/' + questionPicture[iterate] + '.jpg"/>');
            }
            else {
                $(stage).append('<div id="' + iterate + '" class="option">' + questionArray[iterate]+'</div>');
            }
        }

        $('.picture').click(function () {
            if (questionLock == false) {
                questionLock = true;
                //correct answer
                if (parseInt(this.id) == correct[currentQuestion]) {
                    $(stage).append('<div class="feedback1">Točno</div>');
                    score++;
                }
                //wrong answer	
                if (parseInt(this.id) != correct[currentQuestion]) {
                    $(stage).append('<div class="feedback2">Krivo</div>');
                }
                setTimeout(function () { changeQuestion() }, 1000);
            }
        })
        $('.option').click(function () {
            if (questionLock == false) {
                questionLock = true;
                //correct answer
                if (parseInt(this.id) == correct[currentQuestion]) {
                    $(stage).append('<div class="feedback1">Tocno</div>');
                    score++;
                }
                //wrong answer	
                if (parseInt(this.id) != correct[currentQuestion]) {
                    $(stage).append('<div class="feedback2">Krivo</div>');
                }
                setTimeout(function () { changeQuestion() }, 1000);
            }
        })
    }//display question

    function scrollOptions(choice1, choice2) {
        questionNumber = -1;
        RandomizeArray.length = 0;
        minNumQuestions = 10;
        maxNumQuestions = 30;
        if (choice2 != "") {
            $(stage).load("/Home/ExamPartial", function (responseText, textStatus, XMLHttpRequest) {
              
                $('.begin').click(function (e) {
                    e.preventDefault();
                    if (questionLock == false) {
                        questionLock = true;
                        var result = false;
                        //correct answer
                        if (this.id == "true") {
                            result = true;
                        }
                        if (result) {
                            $.getJSON('../Home/LoadQuestionsSubject?idSubject=' + idSubject, function (data) {
                                for (i = 0; i < data.quizlist.length; i++) {
                                    questionBank[i] = new Array;
                                    questionBank[i][0] = data.quizlist[i].idQuestion;
                                    questionBank[i][1] = data.quizlist[i].question;
                                    questionBank[i][2] = data.quizlist[i].picture;
                                    questionBank[i][3] = data.quizlist[i].idInstruction;
                                    questionBank[i][4] = data.quizlist[i].singleChoice;
                                    questionBank[i][5] = new Array();
                                    for (j = 0; j < data.quizlist[i].answers.length; j++) {
                                        questionBank[i][5][j] = new Array();
                                        questionBank[i][5][j][0] = data.quizlist[i].answers[j].idAnswer;
                                        questionBank[i][5][j][1] = data.quizlist[i].answers[j].answer;
                                        questionBank[i][5][j][2] = data.quizlist[i].answers[j].picture;
                                        questionBank[i][5][j][3] = data.quizlist[i].answers[j].correct;
                                    }
                                }
                            });
                        }
                        else {
                            $.getJSON('../Home/LoadQuestionsClass?idClass=' + noClass, function (data) {
                                for (i = 0; i < data.quizlist.length; i++) {
                                    questionBank[i] = new Array;
                                    questionBank[i][0] = data.quizlist[i].idQuestion;
                                    questionBank[i][1] = data.quizlist[i].question;
                                    questionBank[i][2] = data.quizlist[i].picture;
                                    questionBank[i][3] = data.quizlist[i].idInstruction;
                                    questionBank[i][4] = data.quizlist[i].singleChoice;
                                    questionBank[i][5] = new Array();
                                    for (j = 0; j < data.quizlist[i].answers.length; j++) {
                                        questionBank[i][5][j] = new Array();
                                        questionBank[i][5][j][0] = data.quizlist[i].answers[j].idAnswer;
                                        questionBank[i][5][j][1] = data.quizlist[i].answers[j].answer;
                                        questionBank[i][5][j][2] = data.quizlist[i].answers[j].picture;
                                        questionBank[i][5][j][3] = data.quizlist[i].answers[j].correct;
                                    }
                                }
                            });
                        }
                        
                            setTimeout(function () {
                                changeQuestion();
                            }, 3000);
                        }
                    });
            });
        }
        else {
            $(stage).append('<div class="scrollTextSingle"><span>' + choice1 + '</span><div><form>');
            $(stage).append('<select name="Test" onChange="chosenTest(this.value)">');
            $(stage).append('</select><div id="false" class="begin">Započni</div></form></div></div>');
        }


        
    }//display question

    function displayOptions(choice1, choice2) {
        $(stage).append('<div id="true" class="optionText"><span>' + choice1);
        $(stage).append('</span></div><div id="false" class="optionText"><span>' + choice2 + '</span></div>');
        
        $('.optionText').click(function () {
            if (questionLock == false) {
                questionLock = true;
                var result = false;
                var choice1;
                var choice2;
                var final=false;
                //correct answer
                if (this.id=="true") {
                    result = true;
                }
               
                switch (choiceNumber) {
                    case 0:
                        priorityNew = result;
                        if (result) {
                            choice1 = "Kartice za učenje";
                            choiceNumber = 1;
                            choice2 = "Ispit";
                        }
                        else {
                            choice1 = "Pregled";
                            choice2 = "";
                        }
                        break;
                    case 1:
                        exam = !result;
                        choice1 = "Područje";
                        choice2 = "Razred";
                        final = true;
                        break;
                }
                setTimeout(function () {
                    if (priorityNew) {
                        
                        if (final) {
                            scrollOptionBar(choice1,choice2);
                        }
                        else {
                            changeOptionBar(choice1, choice2);
                        }
                    }
                    else {
                        scrollOptionBar(choice1, choice2);
                    }
                    
                }, 1000);
            }
        })
    }//display question


    function changeOptionBar(choice1, choice2) {
        if (stage == "#game1") { stage2 = "#game1"; stage = "#game2";}
        else { stage2 = "#game2"; stage = "#game1"; }
        displayOptions(choice1, choice2);
        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css('right', '-800px'); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    }//change options

    function scrollOptionBar(choice1, choice2) {
        if (stage == "#game1") { stage2 = "#game1"; stage = "#game2"; }
        else { stage2 = "#game2"; stage = "#game1"; }
        scrollOptions(choice1, choice2);
        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css('right', '-800px'); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    }//change options


    function changeQuestion() {

        questionNumber++;
        
        while (true) {
            if (questionNumber >= chosenNumQuestions) {
                break;
            }
            var rnd = Math.random() * questionBank.length;
            rnd = Math.ceil(rnd)-1;
            if (RandomizeArray.lastIndexOf(rnd) === -1) {
                RandomizeArray.push(rnd);
                currentQuestion = rnd;
                break;
            }
            else
            {
                continue;
            }    
        }

        if (stage == "#game1") { stage2 = "#game1"; stage = "#game2"; }
        else { stage2 = "#game2"; stage = "#game1"; }

        if (questionNumber < chosenNumQuestions) { displayQuestion(); } else { displayFinalSlide(); }

        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css('right', '-800px'); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    }//change question

    function displayFinalSlide() {

        $(stage).append('<div class="questionText">Završili ste kviz!<br><br>Ukupno pitanja: ' + chosenNumQuestions + '<br>Točnih odgovora: ' + score + '</div>');

    }//display final slide

});//doc ready