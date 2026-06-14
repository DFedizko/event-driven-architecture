import type { DomainEvent } from "./domain-event";
import { EventsEnum } from "./events.enum";

export class EmailSentEvent implements DomainEvent {
    public readonly name = EventsEnum.EMAIL_SENT_EVENT;

    constructor(recipient: string, message: string) {}
}
