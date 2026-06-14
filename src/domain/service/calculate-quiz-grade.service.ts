import type { Question } from "../entity/quiz.entity";

export class CalculateQuizGradeService {
    private correctAnswers = 0;

    constructor(
        private readonly questions: Question[],
        private readonly answers: Record<string, string>,
    ) {}

    public calculate(): number {
		this.verifyAnswers();
        const grade = (this.correctAnswers / this.questions.length) * 100;
        return grade;
    }

    private verifyAnswers() {
        for (const question of this.questions) {
            const correctAnswer = question.correctAnswer;
            const answer = this.answers[question.id]!;
            if (this.verifyAnswer(correctAnswer, answer)) {
                this.correctAnswers++;
            }
        }
    }

    private verifyAnswer(correctAnswer: string, answer: string) {
        return correctAnswer === answer;
    }
}
