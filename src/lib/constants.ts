import { Question } from "./types";

export const DEFAULT_QUESTIONS: Question[] = [
  {
    prompt: "What is the best programming language?",
    answers: ["typescript"],
    options: [
      {
        value: "typescript",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "javascript",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "python",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "java",
        checked: false,
        id: Math.random().toString(),
      },
    ],
  },
  {
    prompt: "What color is the sky",
    answers: ["blue"],
    options: [
      {
        value: "blue",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "red",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "green",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "orange",
        checked: false,
        id: Math.random().toString(),
      },
    ],
  },
  {
    prompt: "What is the best food?",
    answers: ["waffles"],
    options: [
      {
        value: "waffles",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "burger",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "steak",
        checked: false,
        id: Math.random().toString(),
      },
      {
        value: "pizza",
        checked: false,
        id: Math.random().toString(),
      },
    ],
  },
];
