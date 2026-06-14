import type { Quiz } from "../entity/quiz.entity";

export interface IQuizRepository {
    findById(id: number): Promise<Quiz>;
    save(quiz: Quiz): Promise<void>;
}
