import type { Quiz } from "../../domain/entity/quiz.entity";
import type { IQuizRepository } from "../../domain/repository/quiz.repository";

export class QuizRepositoryInMemory implements IQuizRepository {
    private readonly store = new Map<number, Quiz>();

    async findById(id: number): Promise<Quiz> {
        const quizFound = this.store.get(id);
        if (!quizFound) {
            throw new Error(`Quiz not found by the id ${id}`);
        }
        return quizFound;
    }

    async save(quiz: Quiz): Promise<void> {
        this.store.set(quiz.id, quiz);
    }
}
