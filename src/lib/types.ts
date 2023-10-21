import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type Option = {
  value: string;
  checked: boolean;
  id: string;
};
export type Question = {
  prompt: string;
  answers: string[];
  options: Option[];
};
