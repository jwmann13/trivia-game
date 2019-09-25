let counter = 0;

$(document).ready(function () {
    ResponsePage.displayStartPage();
    $('#startBtn').on('click', function () {
        $('#startPage').addClass('d-none');
        questions.questionArray[counter].display();
        questions.questionArray[counter].timer();
    });
    $('.answer').on('click', function (event) {
        questions.questionArray[counter].checkAnswer($(this));
    });
    $('#resetBtn').on('click', function (event) {
        fullReset();
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
        setTimeout(this.reset, 1500);
    },
    displayWrongAnswer: function (question) {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s the wrong answer!');
        $('#info').html('The correct response was: ' + question.correctAnswer);
        setTimeout(this.reset, 1500);
    },
    displayCorrectAnswer: function (question) {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s correct!');
        $('#info').html(question.funFact);
        setTimeout(this.reset, 1500);
    },
    displayResults: function () {
        let grade = questions.gradeQuiz();
        $('#mainPage').addClass('d-none');
        $('#resultPage').removeClass('d-none');
        $('#percentage').html(Math.floor((grade.correct / questions.questionArray.length) * 100) + "%");
        $('#ratio').html("Correct: " + grade.correct + "</br>Wrong: " + grade.wrong + "</br>Unanswered: " + grade.unanswered);
    },
    reset: function () {
        $('#responsePage').addClass('d-none');
        $('#mainPage').removeClass('d-none');
        counter++;
        if (counter === questions.questionArray.length) {
            ResponsePage.displayResults();
        } else {
            questions.questionArray[counter].timer()
            questions.questionArray[counter].display();
        }
    }
};

function fullReset() {
    $('#resultPage').addClass('d-none');
    counter = 0;
    questions = new QuestionGroup([
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
    ]);
    ResponsePage.displayStartPage();
}

let questions =
    new QuestionGroup(
        [
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
            }),
            new Question({
                question: "What French musical movement was associated with composers like Maurice Ravel and Claude Debussy?",
                answerSet: ["Spectralism", "Hedonism", "Impressionism", "Chromaticism"],
                correctAnswer: "Impressionism",
                funFact: "The movement is sometimes aligned with the movement in painting of the same name but musical Impressionism came later"
            }),
            new Question({
                question: "Which Soviet era composer famously wrote music that went under harsh scrutiny by Joseph Stalin?",
                answerSet: ["Mikhail Gorbachev", "Dimitri Shostakovich", "Pyotyr Tchaicovsky", "Fyodyr Dostoyevsky"],
                correctAnswer: "Dimitri Shostakovich",
                funFact: "Shostakovich escaped the USSR to the United States toward the end of his life."
            }),
            new Question({
                question: "A fugue is a musical form characterized by what compositional feature?",
                answerSet: ["Homophony", "Polytonality", "Pain", "Imitation"],
                correctAnswer: "Imitation",
                funFact: "Fugues were a favorite form of the Baroque era because the dense imitative texture could show off a composer's prowess."
            })
        ]
    );


// load start page
// user presses start button
// display first question and begin timer
// timer decrements a time value, starting at 30, each second
// if the user answers correctly, clear the timer and display appropriate message (correct answer page)
// if the user answers incorrectly, clear the timer and display the appropriate message (wrong answer page)
// if the user waits until the timer counts down, clear the timer and display the approriate message (time up page)
// track number of correct, wrong, and unanswered questions
// display result page with percentage of correct answers