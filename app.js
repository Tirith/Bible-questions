import { questions } from "./questions.js";
import { questionsKid } from "./questionsKid.js";

var numberOfQuestion;
var currentQuestion = [];
let countTip = 0;
const nextBtn = $('.nextQuest');
const nextBtnKid = $('.nextQuestKid');
const tipBtn = $('.nextTip');
const startBtn = $('.startButton');
const categoryLabel = $('.category');
const tipsLabel = $('.tips');
const btnDiv = $('.buttons');
nextBtn.click(roll);
nextBtnKid.click(rollKid);
tipBtn.click(nextTip);

const backGrounds = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg'];
const backGroundsKid = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'];

function init() {
    btnDiv.removeClass('hidden');
    nextTip();
}

startBtn.click(function() {
    init();
    roll();
    $('.question-amount').html('Ilość zagadek: ' + (questions.length + 1 + questionsKid.length + 1));

    startBtn.fadeOut(1000);
    $('.top-bar').css('height', '150px');
})

function changeCategoryLabel(text) {
    categoryLabel.html(text);

}

function showAnswer() {
    changeCategoryLabel(`<div class='category-name'>${currentQuestion.answer}</div>`);
    $('.category-name').css('font-size', '60px');

    $('.vers').removeClass('showVers');

}


function changeBackground() {
    var numberOfImage = Math.floor(Math.random() * backGrounds.length)

    $('body').css('background-image', ' url(" ' + 'img/' + backGrounds[numberOfImage] + ' ")')
}

function changeBackgroundKid() {
    var numberOfImage = Math.floor(Math.random() * backGroundsKid.length)

    $('body').css('background-image', ' url(" ' + 'imgKid/' + backGroundsKid[numberOfImage] + ' ")')
}



// losowanie pytania
function roll() {
    changeBackground();
    $('.tips').stop(true, true).fadeOut(1);
    numberOfQuestion = Math.floor(Math.random() * questions.length)
    tipBtn.html("Następna podpowiedź").removeClass('alert');
    if (questions.length > 0) {
        countTip = 0; //zmienna pomocnicza do podpowiedzi
        currentQuestion = questions[numberOfQuestion];
        changeCategoryLabel(`<div class="category-label">Kategoria:</div> <div class='category-name'>${currentQuestion.category}</div>`)

        questions.splice(numberOfQuestion, 1);
        console.log(questions.length);
        putTip(currentQuestion);
        nextTip();

    } else {
        document.write('Koniec gry')
    }

};

function rollKid() {
    changeBackgroundKid();
    $('.tips').stop(true, true).fadeOut(1);
    numberOfQuestion = Math.floor(Math.random() * questionsKid.length)
    tipBtn.html("Następna podpowiedź").removeClass('alert');
    if (questionsKid.length > 0) {
        countTip = 0; //zmienna pomocnicza do podpowiedzi
        currentQuestion = questionsKid[numberOfQuestion];
        changeCategoryLabel(`<div class="category-label">Kategoria:</div> <div class='category-name'>${currentQuestion.category}</div>`)

        questionsKid.splice(numberOfQuestion, 1);

        putTip(currentQuestion);
        nextTip();

    } else {
        categoryLabel.html('Brak pytań');
    }

};


function putTip(currentQuestion) {
    var currentTips = []
    var currentVers = []
    var str;

    for (var prop in currentQuestion) {
        str = prop;
        var n = str.search("tip");

        if (n != -1) {
            var tip;
            switch (prop) {
                case 'tip1':
                    tip = currentQuestion.tip1.split("_");
                    currentTips.push(tip[0]);
                    currentVers.push(tip[1]);
                    break;
                case 'tip2':
                    tip = currentQuestion.tip2.split("_");
                    currentTips.push(tip[0]);
                    currentVers.push(tip[1]);
                    break;
                case 'tip3':
                    tip = currentQuestion.tip3.split("_");
                    currentTips.push(tip[0]);
                    currentVers.push(tip[1]);
                    break;
                case 'tip4':
                    tip = currentQuestion.tip4.split("_");
                    currentTips.push(tip[0]);
                    currentVers.push(tip[1]);
                    break;
                case 'tip5':
                    tip = currentQuestion.tip5.split("_");
                    currentTips.push(tip[0]);
                    currentVers.push(tip[1]);
                    break;
                default:
                    break;
            }
        }
    }
    for (let i = 0; i < tipsLabel.length; i++) {
        tipsLabel[i].classList.add('hidden');
        tipsLabel[i].innerHTML = `${i+1}. ${currentTips[i]}<div class="vers showVers">${currentVers[i]}</div>`
    }
}

function nextTip() {
    if (countTip <= 4) {
        $('.tips:eq( ' + countTip + ' )').fadeIn(1000);
        countTip++;
        if (countTip == 5) {
            tipBtn.html("Pokaż odpowiedź").addClass('alert');
        }
    } else {
        showAnswer();

    }
}