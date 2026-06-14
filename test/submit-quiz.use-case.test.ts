import { it, expect, describe, beforeEach } from "bun:test";
import { QuizRepositoryInMemory } from "@/infra/repository/quiz.repository.in-memory";
import { SubmitQuizUseCase } from "@/application/usecase/submit-quiz.use-case";
import { Quiz } from "@/domain/entity/quiz.entity";
import { questions } from "./mock/questions";
import type { IQuizRepository } from "@/domain/repository/quiz.repository";
import { MailerServiceInMemory } from "@/infra/service/mailer.service.in-memory";
import type { IMailerService } from "@/application/service/mailer.service";
import type { IMediator } from "@/infra/mediator/mediator";
import { MediatorInMemory } from "@/infra/mediator/mediator.in-memory";
import { QuizCommunicatorHandler } from "@/application/handler/quiz-communicator.handler";
import { QuizCorrectorHandler } from "@/application/handler/quiz-corrector.handler";

const input = {
    name: "John Doe",
    email: "john.doe@email.com",
    quizId: 1,
    answers: {
        1: "a",
        2: "b",
    },
};

let quizRepository: IQuizRepository;
let mailer: IMailerService;
let submitQuizUseCase: SubmitQuizUseCase;
let mediator: IMediator;
let quizCorrectorHandler: QuizCorrectorHandler;
let quizCommunicatorHandler: QuizCommunicatorHandler;

describe("SubmitQuizUseCase", () => {
    beforeEach(() => {
        mediator = new MediatorInMemory();
        quizRepository = new QuizRepositoryInMemory();
        mailer = new MailerServiceInMemory();
        submitQuizUseCase = new SubmitQuizUseCase(mediator);

        quizCorrectorHandler = new QuizCorrectorHandler(quizRepository, mediator);
        quizCommunicatorHandler = new QuizCommunicatorHandler(mailer, mediator);

        mediator.register(quizCorrectorHandler);
        mediator.register(quizCommunicatorHandler);
    });

    it("Deve submeter um quiz respondido e a nota deve ser calculada e enviar uma notificação por email deve ser enviada", async () => {
        input.answers[2] = "a";
        const quiz = new Quiz(1, questions);
        await quizRepository.save(quiz);
        await submitQuizUseCase.execute(input);
        const messages = await mailer.findMessages();
        expect(messages[0]!.message).toBe(`Olá ${input.name}, sua nota do quiz foi de 100`);
    });
});
