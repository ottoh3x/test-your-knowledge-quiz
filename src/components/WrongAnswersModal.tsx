import React from "react";

type QuestionsProps = {
  question: string;
  correctAnswer: string;
  choices: string[];
  selectedAnswer: string;
};

export default function WrongAnswersModal({
  wrongAnswers,
  onClose,
}: {
  wrongAnswers: QuestionsProps[];
  onClose: () => void;
}) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div aria-hidden="true" className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-transparent opacity-75" />
        </div>
        <span
          aria-hidden="true"
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
        >
          ​
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Incorrect Answers
              </h3>
              <div className="mt-2">
                {wrongAnswers.map((answer, idx) => (
                  <div key={idx} className="border-t border-b py-2">
                    <p className="text-sm text-gray-500">
                      Question: {answer.question}
                    </p>
                    <p className="text-sm text-red-500">
                      <svg
                        className=" h-4 w-4 inline-block align-bottom mr-1"
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      Your answer: {answer.selectedAnswer}
                    </p>
                    <p className="text-sm text-green-500">
                      Correct answer: {answer.correctAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
