import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type Answer = {
  value: string;
  checked: boolean;
  id: string;
};
export type Question = {
  prompt: string;
  answer: string;
  answers: Answer[];
};
