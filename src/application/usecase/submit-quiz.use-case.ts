import { QuizSubmittedEvent } from "@/domain/event/quiz-submitted.event";
import type { IMailerService } from "../service/mailer.service";
import type { IMediator } from "@/infra/mediator/mediator";

export class SubmitQuizUseCase {
    constructor(private readonly mediator: IMediator) {}

    public async execute(input: Input): Promise<void> {
        const event = new QuizSubmittedEvent(input.quizId, input.email, input.name, input.answers);
        this.mediator.publish(event);
    }
}

type Input = { name: string; email: string; quizId: number; answers: Record<string, string> };
