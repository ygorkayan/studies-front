import { useState, useEffect, useCallback } from "react";
import type { withFlashCards, Question } from "./types";

// eslint-disable-next-line react/display-name
export const withFlashCard: withFlashCards = (Component) => () => {
  const [question, setQuestion] = useState<Question>({
    question: "",
    answer: "",
    showAnswer: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setQuestion({
        question: "What is React?",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit.",
        showAnswer: false,
      });
    }, 1000);
  }, []);

  const resetQuestion = useCallback(() => {
    setQuestion({
      question: "",
      answer: "",
      showAnswer: false,
    });
  }, []);

  const revealAnswer = useCallback(() => setQuestion((prev) => ({ ...prev, showAnswer: true })), []);

  const questionCorrected = useCallback(() => {
    resetQuestion();

    setTimeout(() => {
      setQuestion({
        question: "What is React?",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit.",
        showAnswer: false,
      });
    }, 1000);
  }, [resetQuestion]);

  const questionIncorrect = useCallback(() => {
    resetQuestion();

    setTimeout(() => {
      setQuestion({
        question: "What is React?",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit.",
        showAnswer: false,
      });
    }, 1000);
  }, [resetQuestion]);

  const loading = question.question === "" && question.answer === "";

  return (
    <Component
      loading={loading}
      question={question}
      revealAnswer={revealAnswer}
      questionCorrected={questionCorrected}
      questionIncorrect={questionIncorrect}
    />
  );
};

export default withFlashCard;
