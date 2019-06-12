const questions = {
    a: {
        question: 'Freddie Mercury was born on...',
        answer: 'September 5th, 1946',
        options: ['November 8th, 1995', 'September 5th, 1946', 'October 28th, 1946', 'December 11th, 1945']
    },
    b: {
        question: "What religion did Freddie's family practice?",
        answer: 'Zoroastrianism',
        options: ['Christianity', 'Judaism', 'Zoroastrianism', 'Hindu']
    },
    c: {
        question: 'At what age did Freddie start taking piano lessons?',
        answer: 'Seven',
        options: ['Seven', 'Nine', 'Eleven', 'Fifteen']
    },
    d: {
        question: 'At the age of 12, Freddie started a school band. This band was called...',
        answer: 'The Hectics',
        options: ['The Hectics', 'The Lunatics', 'Queen', 'Seven Sons']
    },
    e: {
        question: 'In April of 1970, Freddie joined guitarist Brian May and drummer Roger Taylor in a band called...',
        answer: 'Smile',
        options: ['Seven Sons', 'The Hectics', 'Queen', 'Smile']
    },
    f: {
        question: 'After finding bassist John Deacon, they renamed the band to...',
        answer: 'Queen',
        options: ['Seven Sons', 'The Hectics', 'Queen', 'Smile']
    },
    g: {
        question: "Even though he sang in the tenor range, what range did Freddie's voice naturally fall in?",
        answer: 'Baritone',
        options: ['Baritone', 'Bass', 'Alto', 'Soprano']
    },
    // h: {
    //     question: "Even though he sang in the tenor range, what range did Freddie's voice naturally fall in?",
    //     answer: 'Baritone',
    //     options: ['Baritone', 'Bass', 'Alto', 'Soprano']
    // },
}

let qRef = [];
let qIndex = 0;
let correct = 0;
let incorrect = 0;

for (prop in questions) {
    qRef.push(prop);
}

let timer = 30;
let countdown;
let drawTime;
let takeInput = true;

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let draw = function () {
    let segment = canvas.width / 30;
    let frame = segment / 60;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (timer > 5) {
        ctx.fillStyle = 'orange';
    } else {
        ctx.fillStyle = 'lightblue';
    }
    ctx.fillRect(0, 0, width, height);

    width -= frame;
}

// HTML queries
const $area = $('#question-area');
const $stats = $('#statbar');
const $timer = $('#timer');

// Function declaration
function gameStart () {
    showQuestion();
    showStats();
}

function displayTime () {
    if (timer > 0) {
        timer--;
        $timer.text(timer)
    } else {
        resetTimers();
        incorrect++;
        showStats();
        if (qIndex < qRef.length) {
            setTimeout(showQuestion, 1500);
        } else {
            setTimeout(endGame, 1500);
        }
    }
}

function showQuestion () {
    takeInput = true;
    countdown = setInterval(displayTime, 1000);
    drawTime = setInterval(draw, 1000 / 60);

    let q = questions[qRef[qIndex]];
    $area.empty();

    let h2 = $('<h2>').html(q.question);
    $area.append(h2);
    q.options.forEach(e => {
        let btn = $('<button>');
        btn.addClass('answer');
        btn.text(e);
        if (e === q.answer) {
            btn.attr('data-answer', 'correct');
        }
        $area.append(btn);
    });
    qIndex++;
}

function showStats () {
    $stats.html('<span class="correct">Correct: ' + correct + '</span><span class="incorrect">Incorrect: ' + incorrect + '</span>');
}

function endGame () {
    $area.empty();
    let percent = Math.round((correct / qRef.length) * 100);
    let h2 = $('<h2>').text("That's all! You got:");
    let div = $('<div>');
    let span = $('<span>');
    let btn = $('<button>');
    span.text(percent + '%');
    if (percent >= 60) {
        span.addClass('correct');
    } else {
        span.addClass('incorrect');
    }

    btn.text('Try again?');
    btn.attr('id', 'start');

    div.append(span, '<span> Correct</span>');
    $area.append(h2, div, btn);
}

function resetTimers () {
    clearInterval(countdown);
    clearInterval(drawTime);
    timer = 30;
    width = canvas.width;
}


// Event listeners
$(document).on('click', '#start', gameStart);

$(document).on('click', '.answer', function(e) {
    if (takeInput){
        takeInput = false;
        resetTimers();
        if ($(this).attr('data-answer') === 'correct') {
            correct++;
            $(this).addClass('correct');
        } else {
            incorrect++;
            $(this).addClass('incorrect');

        };
        if (qIndex < qRef.length) {
            setTimeout(showQuestion, 1500);
        } else {
            endGame();
        }
        showStats();
    }
})