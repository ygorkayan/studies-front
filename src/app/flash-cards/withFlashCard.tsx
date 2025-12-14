import { useState, useEffect, useCallback } from "react";
import type { withFlashCards, Question } from "./types";
import { getQuestion, answerQuestion } from "./helper";

// eslint-disable-next-line react/display-name
export const withFlashCard: withFlashCards = (Component) => () => {
  const [question, setQuestion] = useState<Question>({
    id: 0,
    question: "",
    answer: "",
    showAnswer: false,
  });

  const revealAnswer = useCallback(() => setQuestion((prev) => ({ ...prev, showAnswer: true })), []);

  const handleAnswer = useCallback(
    async (correct: boolean) => {
      const id = question.id;

      setQuestion({
        id: 0,
        question: "",
        answer: "",
        showAnswer: false,
      });

      await answerQuestion(id, correct);
      const data = await getQuestion();

      setQuestion({ ...data, showAnswer: false });
    },
    [question.id]
  );

  useEffect(() => {
    document.title = "Flash Cards";
    getQuestion().then((data) => setQuestion({ ...data, showAnswer: false }));
  }, []);

  const loading = question.question === "" && question.answer === "";

  return (
    <Component
      id={question.id}
      loading={loading}
      question={question}
      handleAnswer={handleAnswer}
      revealAnswer={revealAnswer}
    />
  );
};

export default withFlashCard;
