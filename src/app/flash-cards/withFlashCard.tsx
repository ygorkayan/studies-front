import { useState, useEffect } from "react";
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

  const resetQuestion = () => {
    setQuestion({
      id: 0,
      question: "",
      answer: "",
      showAnswer: false,
    });
  };

  const revealAnswer = () => setQuestion((prev) => ({ ...prev, showAnswer: true }));

  const handleAnswer = async (correct: boolean) => {
    const id = question.id;
    resetQuestion();

    await answerQuestion(id, correct);
    const data = await getQuestion();
    
    setQuestion({ ...data, showAnswer: false });
  };

  useEffect(() => {
    getQuestion().then((data) => setQuestion({ ...data, showAnswer: false }));
  }, []);

  const loading = question.question === "" && question.answer === "";

  return <Component loading={loading} question={question} handleAnswer={handleAnswer} revealAnswer={revealAnswer} />;
};

export default withFlashCard;
