"use client";

import { DEFAULT_QUESTIONS } from "@/lib/constants";
import { Option, Question, SetState } from "@/lib/types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showResults ? (
        <h1 className="mb-10 text-4xl">
          Your score is {Math.max(0, score)}/{questions.length}!
        </h1>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="mt-3 text-2xl font-black">
            Question {currentQuestionIndex + 1}
          </h2>
          <h3 className="mb-2 mt-1 text-lg">{currentQuestion.prompt}</h3>
          <CheckboxGroup>
            {currentQuestion.options.map((answer: Option, index: number) => (
              <Checkbox
                size="lg"
                key={answer.id}
                value={answer.value}
                checked={answer.checked}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const newQuestions = [...questions];
                  newQuestions[currentQuestionIndex].options[index].checked =
                    event.target.checked;
                  setQuestions(newQuestions);
                }}
              >
                {answer.value}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <div className="mt-10 flex w-full items-center justify-center gap-4">
            <PreviousQuestionButton
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <NextQuestionButton
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <SubmitQuestionsButton
              questions={questions}
              setScore={setScore}
              setShowResults={setShowResults}
            />
          </div>
        </div>
      )}
    </main>
  );
}

/**
 * Submit questions button and props
 */
interface SubmitQuestionsButtonProps {
  questions: Question[];
  setScore: SetState<number>;
  setShowResults: SetState<boolean>;
}
const SubmitQuestionsButton = (props: SubmitQuestionsButtonProps) => {
  const isCorrectAnswer = (answers: string[], option: string) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === option) return true;
    }

    return false;
  };

  const onClick = () => {
    let score: number = 0;

    props.questions.forEach((question: Question) => {
      question.options.forEach((option: Option) => {
        if (!option.checked) return;

        const isCorrect: boolean = isCorrectAnswer(
          question.answers,
          option.value,
        );
        isCorrect ? score++ : (score -= 1 / 2);
      });
    });

    props.setScore(score);
    props.setShowResults(true);
  };

  return (
    <button
      className="rounded bg-blue-500 px-10 py-3 text-white hover:bg-blue-700"
      onClick={onClick}
    >
      Submit
    </button>
  );
};

/**
 * Previous question button and props
 */
interface PreviousQuestionButtonProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: SetState<number>;
}
const PreviousQuestionButton = (props: PreviousQuestionButtonProps) => {
  return (
    <button
      disabled={props.currentQuestionIndex <= 0}
      className="rounded bg-blue-500 px-10 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      onClick={() => {
        if (props.currentQuestionIndex > 0) {
          props.setCurrentQuestionIndex(props.currentQuestionIndex - 1);
        }
      }}
    >
      Previous
    </button>
  );
};

/**
 * Next question button and props
 */
interface NextQuestionButtonProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: SetState<number>;
}
const NextQuestionButton = (props: NextQuestionButtonProps) => {
  return (
    <button
      disabled={props.currentQuestionIndex >= props.questions.length - 1}
      className="rounded bg-blue-500 px-10 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      onClick={() => {
        if (props.currentQuestionIndex < props.questions.length - 1) {
          props.setCurrentQuestionIndex(props.currentQuestionIndex + 1);
        }
      }}
    >
      Next
    </button>
  );
};
