import type { IHandler } from "@/application/handler/handler";
import type { DomainEvent } from "@/domain/event/domain-event";

export interface IMediator {
    register(handler: IHandler): Promise<void>;
    publish(event: DomainEvent): Promise<void>;
}
