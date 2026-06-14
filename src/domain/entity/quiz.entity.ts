export type Question = {
    id: number;
    description: string;
    answers: {
        id: string;
        description: string;
    }[];
    correctAnswer: string;
};

export class Quiz {
    constructor(
        public readonly id: number,
        public readonly questions: Question[],
    ) {}
}
