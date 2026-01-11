import { URL_CREATE_FLASH_CARD } from "../../../global";

export const createFlashCardService = async (question: string, answer: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(URL_CREATE_FLASH_CARD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify({ question, answer }),
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!res.ok) {
    return false;
  }

  return true;
};
