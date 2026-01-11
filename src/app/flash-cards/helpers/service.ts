import { URL_ANSWER_QUESTION, URL_GET_QUESTION } from "../../../global";
import type { BodyAnswer } from "./types";

export const getQuestion = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(URL_GET_QUESTION, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch question: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  return json.body;
};

export const answerQuestion = async (id: number, body: BodyAnswer) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_ANSWER_QUESTION}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!response.ok) {
    throw new Error(`Failed to answer question: ${response.status} ${response.statusText}`);
  }
};
