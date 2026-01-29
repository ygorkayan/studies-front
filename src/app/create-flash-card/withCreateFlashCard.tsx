import { useState, useCallback } from "react";
import type { withCreateFlashCardType } from "./helpers/types";
import { createFlashCardService } from "./helpers/service";

// eslint-disable-next-line react/display-name
export const withCreateFlashCard: withCreateFlashCardType = (Component) => () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hasError, setHasError] = useState(false);

  const clean = useCallback(() => {
    setQuestion("");
    setAnswer("");
    setHasError(false);
  }, []);

  const createFlashCard = useCallback(async () => {
    setHasError(false);
    const success = await createFlashCardService(question, answer);

    if (success) {
      clean();
    } else {
      setHasError(true);
    }
  }, [question, answer, clean]);

  const createDisabled = question.trim() === "" || answer.trim() === "";

  return (
    <Component
      clean={clean}
      answer={answer}
      question={question}
      hasError={hasError}
      setAnswer={setAnswer}
      setQuestion={setQuestion}
      createDisabled={createDisabled}
      createFlashCard={createFlashCard}
    />
  );
};

export default withCreateFlashCard;
