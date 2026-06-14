import type { DomainEvent } from "./domain-event";
import { EventsEnum } from "./events.enum";

export class QuizSubmittedEvent implements DomainEvent {
    public readonly name = EventsEnum.QUIZ_SUBMITTED_EVENT;

    constructor(
        public readonly quizId: number,
        public readonly email: string,
        public readonly userName: string,
        public readonly answers: Record<string, string>,
    ) {}
}
