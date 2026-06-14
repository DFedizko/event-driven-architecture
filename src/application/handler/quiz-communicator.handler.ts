import { EventsEnum } from "@/domain/event/events.enum";
import type { IHandler } from "./handler";
import type { QuizCorrectedEvent } from "@/domain/event/quiz-corrected.event";
import type { IMailerService } from "../service/mailer.service";
import type { IMediator } from "@/infra/mediator/mediator";
import { EmailSentEvent } from "@/domain/event/email-sent.event";

export class QuizCommunicatorHandler implements IHandler {
    readonly eventName = EventsEnum.QUIZ_CORRECTED_EVENT;

    constructor(
        private readonly mailerService: IMailerService,
        private readonly mediator: IMediator,
    ) {}

    public async handle(event: QuizCorrectedEvent): Promise<void> {
        const message = `Olá ${event.userName}, sua nota do quiz foi de ${event.grade}`;
        await this.mailerService.send(event.email, message);
        const emailSentEvent = new EmailSentEvent(event.email, message);
        this.mediator.publish(emailSentEvent);
    }
}
