import { test, expect } from "bun:test";
import { Quiz } from "../src/domain/entity/quiz.entity";
import { questions } from "./mock/questions";

test("Deve criar um quiz", () => {
    const quiz = new Quiz(1, questions);
    expect(quiz.id).toBe(1);
    expect(quiz.questions[0]!.id).toBe(1);
    expect(quiz.questions).toHaveLength(2);
});
