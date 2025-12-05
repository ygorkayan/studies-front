const URL_BASE = "https://studies-back.ygorkayan.workers.dev/question";

export const getQuestion = async () => {
  const res = await fetch(URL_BASE);
  const json = await res.json();

  return json.body;
};

export const answerQuestion = async (id: number, correct: boolean) => {
  return await fetch(`${URL_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: correct ? "correct" : "incorrect" }),
  });
};
