import { it, expect, describe, beforeEach } from "bun:test";
import { QuizRepositoryInMemory } from "../src/infra/quiz.repository.in-memory";
import { SubmitQuizUseCase } from "../src/application/usecase/submit-quiz.use-case";
import { Quiz } from "../src/domain/entity/quiz.entity";
import { questions } from "./mock/questions";
import type { IQuizRepository } from "../src/domain/repository/quiz.repository";

let quizRepository: IQuizRepository;
let submitQuizUseCase: SubmitQuizUseCase;

describe("SubmitQuizUseCase", () => {
    beforeEach(() => {
        quizRepository = new QuizRepositoryInMemory();
        submitQuizUseCase = new SubmitQuizUseCase(quizRepository);
    });

    it("Um usuário deve submeter um quiz respondido e a nota deve ser calculada", async () => {
        const quiz = new Quiz(1, questions);
        await quizRepository.save(quiz);
        const input = {
            name: "John Doe",
            email: "john.doe@email.com",
            quizId: 1,
            answers: {
                1: "a",
                2: "b",
            },
        };
        const output = await submitQuizUseCase.execute(input);
        expect(output.grade).toBe(50);
    });
});
