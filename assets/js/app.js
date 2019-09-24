let counter = 0;

$(document).ready(function () {
    ResponsePage.displayStartPage();
    $('#startBtn').on('click', function () {
        $('#startPage').addClass('d-none');
        questions[counter].display();
        questions[counter].timer();
    });
    $('.answer').on('click', function (event) {
        // event.preventDefault();
        questions[counter].checkAnswer($(this));
    });
});

let ResponsePage = {
    displayStartPage: function () {
        $('#startPage').removeClass('d-none');
    },
    displayTimesUp: function (question) {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('Time\'s up!');
        $('#info').html('Answer a little faster next time!');
        setTimeout(this.reset, 3000);
    },
    displayWrongAnswer: function (question) {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s the wrong answer!');
        $('#info').html('The correct response was: ' + question.correctAnswer);
        setTimeout(this.reset, 3000);
    },
    displayCorrectAnswer: function (question) {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s correct!');
        $('#info').html(question.funFact);
        setTimeout(this.reset, 3000);
    },
    displayResults: function () {
        $('#mainPage').addClass('d-none');
        $('#resultPage').removeClass('d-none');
    },
    reset: function () {
        $('#responsePage').addClass('d-none');
        $('#mainPage').removeClass('d-none');
        counter++;
        questions[counter].timer()
        questions[counter].display();
    }
};

function grade(q){
    let corrects = 0;
    let wrongs = 0; 
    let unanswered = 0;
    if (guess.data('index') === q.answerSet.indexOf(q.correctAnswer)){

    } else if (q.time <= 0) {

    } else {
        
    }
}

const questions = [
    new Question({
        question: "Which composers form the 'Three B's' of classical music?",
        answerSet: ["Buttigigeg, Berkowitz, and Bond", "Beelzebub, Bertram, and Bozo", "Berlioz, Barney, and Brin", "Bach, Beethoven, and Brahms"],
        correctAnswer: "Bach, Beethoven, and Brahms",
        funFact: "These composers all lived at different times and are meant to represent the best of the different eras."
    }),
    new Question({
        question: "Mozart lived in which century?",
        answerSet: ["18th century", "13th century", "20th century", "23rd century"],
        correctAnswer: "18th century",
        funFact: "The 1700s are known as the Classical Period."
    }),
    new Question({
        question: "Gregorian chant was practiced by what type of people?",
        answerSet: ["Merchants", "Monks", "Farmers", "Royalty"],
        correctAnswer: "Monks",
        funFact: "Monks sang these simple chants to praise God."
    }),
    new Question({
        question: "What nationality was Nikolai Rimsky-Korsakov, composer of 'Flight of the Bumblebee'?",
        answerSet: ["English", "French", "Russian", "Dutch"],
        correctAnswer: "Russian",
        funFact: "Rimsky-Korsakov was a member of 'The Five', a group of Russian composers who intended to create a distinctly Russian style of music."
    }),
    new Question({
        question: "J.S. Bach did not make his living as a composer but in what profession?",
        answerSet: ["Church Organist", "Carpenter", "Tax Attorney", "Male Model"],
        correctAnswer: "Church Organist",
        funFact: "He worked at St. Thomas Church in Leipzig until his death in 1705."
    })
];


// load start page
// user presses start button
// display first question and begin timer
// timer decrements a time value, starting at 30, each second
// if the user answers correctly, clear the timer and display appropriate message (correct answer page)
// if the user answers incorrectly, clear the timer and display the appropriate message (wrong answer page)
// if the user waits until the timer counts down, clear the timer and display the approriate message (time up page)
// track number of correct, wrong, and unanswered questions
// display result page with percentage of correct answers