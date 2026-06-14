export type Message = { recipient: string; message: string };

export interface IMailerService {
    findMessages(): Promise<Message[]>;
    send(recipient: string, message: string): Promise<void>;
}
