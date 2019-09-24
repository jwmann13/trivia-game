class Question {
    constructor(q) {
        this.question = q.question;
        this.answerSet = q.answerSet;
        this.correctAnswer = q.correctAnswer;
        this.funFact = q.funFact;
        this.time = 30;
        this.clock;
    }
    checkAnswer(guess) {
        if (guess.data('index') === this.answerSet.indexOf(this.correctAnswer)) {
            clearTimeout(this.clock)
            if (counter === questions.length - 1) {
                ResponsePage.displayResults();
            } else {
                ResponsePage.displayCorrectAnswer(this);
            }
        } else {
            clearTimeout(this.clock)
            if (counter === questions.length - 1) {
                ResponsePage.displayResults();
            } else {
                ResponsePage.displayWrongAnswer(this);
            }
        }
    }
    display() {
        $('#mainPage').removeClass('d-none')
        $('.question').html(this.question);
        for (let i = 0; i < this.answerSet.length; i++) {
            $(`.answer[data-index=${i}]`).html(this.answerSet[i])
        }
    }
    timer() {
        let inst = this;
        let time = this.time;
        $('.timer').html('Time left 00:' + time);
        this.clock = setInterval(function () {
            time--;
            if (time < 10) {
                $('.timer').html('Time left 00:0' + time);
            } else {
                $('.timer').html('Time left 00:' + time);
            }
            if (time <= 0) {
                inst.time = time;
                clearTimeout(inst.clock);
                ResponsePage.displayTimesUp(inst);
            }
        }, 1000);
    }

};