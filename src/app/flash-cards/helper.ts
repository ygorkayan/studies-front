const URL_BASE = "https://studies-back.ygorkayan.workers.dev/question";

export const getQuestion = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(URL_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (res.status === 401) {
    alert("Your session has expired. Please log in again.");
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
    },
    body: JSON.stringify({ answer: correct ? "correct" : "incorrect", token }),
  });

  if (response.status === 401) {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch question: ${response.status} ${response.statusText}`);
  }
};
