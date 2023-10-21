"use client";

import { DEFAULT_QUESTIONS } from "@/lib/constants";
import { Answer, Question, SetState } from "@/lib/types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showResults ? (
        <h1 className="text-4xl mb-10">
          You got {correctAnswers} out of {questions.length} correct!
        </h1>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-black mt-3">
            Question {currentQuestionIndex + 1}
          </h2>
          <h3 className="text-lg mt-1 mb-2">{currentQuestion.prompt}</h3>
          <CheckboxGroup>
            {currentQuestion.answers.map((answer: Answer, index: number) => (
              <Checkbox
                size="lg"
                key={answer.id}
                value={answer.value}
                checked={answer.checked}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const newQuestions = [...questions];
                  newQuestions[currentQuestionIndex].answers[index].checked =
                    event.target.checked;
                  setQuestions(newQuestions);
                }}
              >
                {answer.value}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <div className="flex justify-center items-center gap-4 w-full mt-10">
            <PreviousQuestionButton
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <NextQuestionButton
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              questions={questions}
            />
            <SubmitQuestionsButton
              questions={questions}
              setCorrectAnswers={setCorrectAnswers}
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
  setCorrectAnswers: SetState<number>;
  setShowResults: SetState<boolean>;
}
const SubmitQuestionsButton = (props: SubmitQuestionsButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-10 rounded"
      onClick={() => {
        let correctAnswers = 0;

        props.questions.forEach((question: Question) => {
          question.answers.forEach((answer: Answer) => {
            if (answer.checked && answer.value === question.answer) {
              correctAnswers++;
            }
          });
        });

        props.setCorrectAnswers(correctAnswers);
        props.setShowResults(true);
      }}
    >
      Submit
    </button>
  );
};

/**
 * Previous question button and props
 */
interface PreviousQuestionButtonProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: SetState<number>;
}
const PreviousQuestionButton = (props: PreviousQuestionButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-10 rounded"
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
  currentQuestionIndex: number;
  setCurrentQuestionIndex: SetState<number>;
  questions: Question[];
}
const NextQuestionButton = (props: NextQuestionButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-10 rounded"
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
