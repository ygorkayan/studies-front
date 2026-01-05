const URL_BASE = "https://studies-back.ygorkayan.workers.dev/question";

export const getQuestion = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(URL_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token || ""
    }
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

export const answerQuestion = async (id: number, correct: boolean) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token || ""
    },
    body: JSON.stringify({ answer: correct ? "correct" : "incorrect" }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!response.ok) {
    throw new Error(`Failed to answer question: ${response.status} ${response.statusText}`);
  }
};
