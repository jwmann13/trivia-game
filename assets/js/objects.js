class Question {
    constructor(q) {
        this.question = q.question;
        this.answerSet = q.answerSet;
        this.correctAnswer = q.correctAnswer;
        this.funFact = q.funFact;
        this.time = 30;
        this.clock;
        this.answered = false;
    }
    checkAnswer(guess) {
        if (guess.data('index') === this.answerSet.indexOf(this.correctAnswer)) {
            clearTimeout(this.clock);
            this.answered = true;
            if (counter === questions.length - 1) {
                ResponsePage.displayResults();
            } else {
                ResponsePage.displayCorrectAnswer(this);
            }
        } else {
            clearTimeout(this.clock);
            this.answered = false;
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
                if (counter === questions.length - 1) {
                    ResponsePage.displayResults();
                } else {
                    ResponsePage.displayTimesUp(inst);
                }
            }
        }, 1000);
    }
};

class QuestionGroup {
     constructor (group){
         this.counter = 0;
         this.questionArray = group;
         this.gradedQuiz = {
            'correct': 0,
            'wrong': 0,
            'unanswered': 0
        };
     }
     gradeQuiz() {
        let corrects = 0;
        let wrongs = 0;
        let unanswered = 0;
        for (let i = 0; i < this.questionArray.length; i++) {
            const element = this.questionArray[i];
            if (element.answered) {
                this.gradedQuiz.correct = corrects++;
            } else if (element.time <= 0) {
                this.gradedQuiz.unanswered = unanswered++;
            } else {
                this.gradedQuiz.wrong = wrongs++;
            }
        }
        return this.gradedQuiz;
    }
}