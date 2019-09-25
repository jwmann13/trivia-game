class Question {
    constructor(q) {
        this.question = q.question;
        this.answerSet = q.answerSet;
        this.correctAnswer = q.correctAnswer;
        this.funFact = q.funFact;
        this.time = 10;
        this.clock;
        this.answered = false;
        this.answerState = {
            correct: false,
            wrong: false,
            unanswered: false
        };
    }
    checkAnswer(guess) {
        if (guess.data('index') === this.answerSet.indexOf(this.correctAnswer)) {
            clearTimeout(this.clock);
            this.answered = true;
            ResponsePage.displayCorrectAnswer(this);
        } else {
            clearTimeout(this.clock);
            this.answered = false;
            ResponsePage.displayWrongAnswer(this);
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
    grade(){
        if (this.answered) {
            this.answerState.correct = true;
        } else if (this.time === 0) {
            this.answerState.unanswered = true;
        } else {
            this.answerState.wrong = true;
        }
        return this.answerState;
    }
};

class QuestionGroup {
    constructor(group) {
        this.questionArray = group;
        this.gradedQuiz = {
            'correct': 0,
            'wrong': 0,
            'unanswered': 0
        };
    }
    gradeQuiz() {
        this.questionArray.forEach((element)=> {
            let state = element.grade();
            if (state.correct) {
                this.gradedQuiz.correct++;
            } else if (state.wrong){
                this.gradedQuiz.wrong++;
            } else if (state.unanswered){
                this.gradedQuiz.unanswered++;
            }
        });
        console.log(this.gradedQuiz);
        return this.gradedQuiz;
    }
}