import type { DomainEvent } from "@/domain/event/domain-event";
import type { IMediator } from "./mediator";
import type { IHandler } from "@/application/handler/handler";

export class MediatorInMemory implements IMediator {
    private readonly handlers: IHandler[] = [];

    async register(handler: IHandler): Promise<void> {
        this.handlers.push(handler);
    }

    async publish(event: DomainEvent): Promise<void> {
        for (const handler of this.handlers) {
            if (handler.eventName === event.name) {
                handler.handle(event);
            }
        }
    }
}
