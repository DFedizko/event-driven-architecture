import type { IQuizRepository } from "../../domain/repository/quiz.repository";
import { CalculateQuizGradeService } from "../../domain/service/calculate-quiz-grade.service";

export class SubmitQuizUseCase {
    constructor(private readonly quizRepository: IQuizRepository) {}

    public async execute(input: Input): Promise<Output> {
        const quiz = await this.quizRepository.findById(input.quizId);
        const calculateQuizGradeService = new CalculateQuizGradeService(quiz.questions, input.answers);
        const grade = calculateQuizGradeService.calculate();
        return { grade };
    }
}

type Input = { name: string; email: string; quizId: number; answers: Record<string, string> };
type Output = { grade: number };
