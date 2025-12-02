import type { FC } from "react";
import styles from "./FlashCards.module.css";
import Button from "../components/Button/Button";
import type { FlashCardPros } from "./types";
import withFlashCard from "./withFlashCard";
import Loading from "../components/Loading/Loading";

export const FlashCards: FC<FlashCardPros> = ({
  loading,
  question,
  revealAnswer,
  questionCorrected,
  questionIncorrect,
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{question.showAnswer ? "Answer" : "Question"}</h1>

        <span className={styles.description}>{question.showAnswer ? question.answer : question.question}</span>

        <div className={styles.buttons}>
          {!question.showAnswer && <Button onClick={revealAnswer}>Show Answer</Button>}

          {question.showAnswer && <Button onClick={questionCorrected}>Correct</Button>}

          {question.showAnswer && <Button onClick={questionIncorrect}>Incorrect</Button>}
        </div>
      </div>
    </div>
  );
};

export default withFlashCard(FlashCards);
