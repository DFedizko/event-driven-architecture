import type { DomainEvent } from "./domain-event";
import { EventsEnum } from "./events.enum";

export class QuizCorrectedEvent implements DomainEvent {
    readonly name = EventsEnum.QUIZ_CORRECTED_EVENT;

    constructor(
        public readonly email: string,
        public readonly userName: string,
        public readonly grade: number,
    ) {}
}
