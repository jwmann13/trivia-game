$(document).ready(function () {
    $('.answer').on('click', function () {
        Question.checkAnswer($(this));
    });
    Question.display();
    Timer.countdown();
});

let Question = {
    question: "What's 2 + 2?",
    answerSet: ['5', '10', '4', '1'],
    correctAnswer: "4",
    funFact: "This is called Math",
    checkAnswer: function (guess) {
        if (guess.data('index') === this.answerSet.indexOf(this.correctAnswer)) {
            ResponsePage.displayCorrectAnswer();
        } else {
            ResponsePage.displayWrongAnswer();
        }
    },
    display: function () {
        $('#mainPage').removeClass('d-none')
        $('.question').html(this.question);
        for (let i = 0; i < this.answerSet.length; i++) {
            $(`.answer[data-index=${i}]`).html(this.answerSet[i])
        }
    }
}

let Timer = {
    countdown: function () {
        let time = 30;
        $('.timer').html('Time left: ' + time);
        let decr = setInterval(function () {
            time--;
            $('.timer').html('Time left: ' + time);
            if (time < 0) {
                clearInterval(decr);
                ResponsePage.displayTimesUp();
            }
        }, 1000);
        return time;
    }
}

let ResponsePage = {
    displayTimesUp: function () {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('Time\'s up!');
        $('#info').html('Answer a little faster next time!');
        setTimeout(this.reset, 3000);
        setTimeout(Timer.countdown, 3000);
    },
    displayWrongAnswer: function () {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s the wrong answer!');
        $('#info').html('The correct response was: ' + Question.correctAnswer);
        setTimeout(this.reset, 3000);
    },
    displayCorrectAnswer: function () {
        $('#mainPage').addClass('d-none');
        $('#responsePage').removeClass('d-none');
        $('#message').html('That\'s correct!');
        $('#info').html(Question.funFact);
        setTimeout(this.reset, 3000);
    },
    reset: function () {
        $('#responsePage').addClass('d-none');
        $('#mainPage').removeClass('d-none');
    }
}