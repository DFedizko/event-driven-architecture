import { EventsEnum } from "@/domain/event/events.enum";
import type { IHandler } from "./handler";
import type { QuizSubmittedEvent } from "@/domain/event/quiz-submitted.event";
import type { IQuizRepository } from "@/domain/repository/quiz.repository";
import { CalculateQuizGradeService } from "@/domain/service/calculate-quiz-grade.service";
import type { IMediator } from "@/infra/mediator/mediator";
import { QuizCorrectedEvent } from "@/domain/event/quiz-corrected.event";

export class QuizCorrectorHandler implements IHandler {
    readonly eventName = EventsEnum.QUIZ_SUBMITTED_EVENT;

    constructor(
        private readonly quizRepository: IQuizRepository,
        private readonly mediator: IMediator,
    ) {}

    public async handle(event: QuizSubmittedEvent): Promise<void> {
        const quiz = await this.quizRepository.findById(event.quizId);
        const calculateQuizGradeService = new CalculateQuizGradeService(quiz.questions, event.answers);
        const grade = calculateQuizGradeService.calculate();
        const quizCorrectedEvent = new QuizCorrectedEvent(event.email, event.userName, grade);
        this.mediator.publish(quizCorrectedEvent);
    }
}
