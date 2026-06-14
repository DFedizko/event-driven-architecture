import type { IMailerService, Message } from "@/application/service/mailer.service";

export class MailerServiceInMemory implements IMailerService {
    private readonly messages: Message[] = [];

    async findMessages(): Promise<Message[]> {
        return this.messages;
    }

    async send(recipient: string, message: string): Promise<void> {
        this.messages.push({ recipient, message });
        console.log(message);
    }
}
