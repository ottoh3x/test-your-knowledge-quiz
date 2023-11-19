"use client";

import { useState, useEffect } from "react";
import { questions as qsts } from "../../utils/qsts";
import WrongAnswersModal from "@/components/WrongAnswersModal";

type QuestionsProps = {
  question: string;
  correctAnswer: string;
  choices: string[];
  selectedAnswer?: string;
};

function getRandomQuestions(allQuestions: QuestionsProps[], count: number) {
  const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

  const randomQuestions = shuffledQuestions.slice(0, count);

  return randomQuestions;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<any>([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const isGameOver = questions.length <= currentIndex;

  useEffect(() => {
    setQuestions(getRandomQuestions(qsts, 10));
  }, [isGameOver]);
  // @ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();

    questions[currentIndex].selectedAnswer = selectedAnswer;
    setCurrentIndex((t) => t + 1);
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore((t) => t + 1);
    } else {
      setWrongAnswers([...wrongAnswers, questions[currentIndex]]);
    }
    console.log(selectedAnswer);
    setSelectedAnswer("");
  };

  const reset = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedAnswer("");
  };

  return (
    <main className="flex min-h-screen flex-col  justify-between ">
      <section className="w-full h-screen flex flex-col items-center pt-5 lg:justify-center px-4 md:px-6 lg:px-12 ">
        <h1 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50">
          Knowledge Testing Quiz
        </h1>

        {isGameOver ? (
          <div className="p-6 bg-neutral-900 rounded-lg shadow-lg">
            <p>
              You got {score} Correct Answers and {questions.length - score}{" "}
              Incorrect.
            </p>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="w-full mt-6 text-zinc-50 bg-zinc-800 hover:bg-black rounded-md py-2"
              >
                Try Again
              </button>
              <button
                onClick={() => setShowWrongAnswers(true)}
                className="w-full mt-6 text-zinc-50 bg-zinc-800 hover:bg-black rounded-md py-2"
              >
                Wrong Answers
              </button>
            </div>
          </div>
        ) : (
          <form>
            <div className="lg:w-[700px] max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 dark:bg-zinc-800/75">
              <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                {currentIndex + 1}. {questions[currentIndex].question}
              </h2>
              {questions[currentIndex].choices.map((choice) => (
                <div
                  onClick={() => setSelectedAnswer(choice)}
                  key={choice}
                  className="space-y-2 cursor-pointer"
                >
                  <div
                    className={`flex items-center justify-between bg-zinc-200 my-1  ${
                      selectedAnswer == choice
                        ? "dark:bg-zinc-900"
                        : "dark:bg-zinc-700/50"
                    } w-full p-2 rounded-md text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-900 transition-colors duration-200`}
                  >
                    <span>{choice}</span>
                    {selectedAnswer == choice && (
                      <svg
                        className="  text-green-600 transition-opacity duration-200"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={onSubmit}
                className="w-full mt-6 text-zinc-50 bg-black/40 hover:bg-black rounded-md py-2"
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {showWrongAnswers && (
          <WrongAnswersModal
            wrongAnswers={wrongAnswers}
            onClose={() => setShowWrongAnswers(false)}
          />
        )}
      </section>
    </main>
  );
}
