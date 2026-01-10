import { useState, useEffect, useCallback } from "react";
import type { withFlashCards, Question, BodyAnswer } from "./helpers/types";
import { getQuestion, answerQuestion } from "./helpers/service";

// eslint-disable-next-line react/display-name
export const withFlashCard: withFlashCards = (Component) => () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [question, setQuestion] = useState<Question>({
    id: 0,
    question: "",
    answer: "",
    showAnswer: false,
  });

  const revealAnswer = useCallback(() => setQuestion((prev) => ({ ...prev, showAnswer: true })), []);

  const saveQuestion = useCallback(
    async (body: BodyAnswer) => {
      const id = question.id;

      setQuestion({
        id: 0,
        question: "",
        answer: "",
        showAnswer: false,
      });

      await answerQuestion(id, body);
      const data = await getQuestion();

      setIsEditMode(false);
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
      isEditMode={isEditMode}
      saveQuestion={saveQuestion}
      revealAnswer={revealAnswer}
      startEditing={() => setIsEditMode(true)}
      cancelEditing={() => setIsEditMode(false)}
    />
  );
};

export default withFlashCard;
