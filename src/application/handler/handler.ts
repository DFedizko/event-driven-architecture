import type { DomainEvent } from "@/domain/event/domain-event";

export interface IHandler {
    eventName: string;
    handle(event: DomainEvent): Promise<void>;
}
