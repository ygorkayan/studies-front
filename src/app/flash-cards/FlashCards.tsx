import { useState, type FC } from "react";
import styles from "./FlashCards.module.css";
import Button from "../components/Button/Button";
import type { FlashCardProps } from "./types";
import withFlashCard from "./withFlashCard";
import Loading from "./components/Loading/Loading";
import Edit from "./edit.svg";
import Textarea from "../components/Textarea/Textarea";

export const FlashCards: FC<FlashCardProps> = ({
  id,
  loading,
  question,
  isEditMode,
  saveQuestion,
  startEditing,
  revealAnswer,
  cancelEditing,
}) => {
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  const currentQuestion = editedQuestion || question.question;
  const currentAnswer = editedAnswer || question.answer;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Question - {id} <img src={Edit} alt="Edit" className={styles.edit} onClick={startEditing} />
        </h1>

        <div className={styles["question-container"]}>
          {!isEditMode && <span>{currentQuestion}</span>}

          {question.showAnswer && !isEditMode && <span>{currentAnswer}</span>}

          {isEditMode && <Textarea value={currentQuestion} onChange={setEditedQuestion} />}

          {isEditMode && (
            <Textarea value={currentAnswer} width="min(400px, 100%)" height="250px" onChange={setEditedAnswer} />
          )}
        </div>

        <div className={styles.buttons}>
          {isEditMode && (
            <Button
              onClick={() => {
                saveQuestion({ question: currentQuestion, answer: currentAnswer });
                cancelEditing();
                setEditedQuestion("");
                setEditedAnswer("");
              }}
            >
              Save
            </Button>
          )}

          {isEditMode && (
            <Button
              onClick={() => {
                cancelEditing();
                setEditedQuestion("");
                setEditedAnswer("");
              }}
            >
              Cancel
            </Button>
          )}

          {!question.showAnswer && !isEditMode && <Button onClick={revealAnswer}>Show Answer</Button>}

          {question.showAnswer && !isEditMode && (
            <Button onClick={() => saveQuestion({ controller: "correct" })}>Correct</Button>
          )}

          {question.showAnswer && !isEditMode && (
            <Button onClick={() => saveQuestion({ controller: "incorrect" })}>Incorrect</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withFlashCard(FlashCards);
