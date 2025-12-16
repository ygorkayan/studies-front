export const login = async (user: string, password: string) => {
  const url = "https://studies-back.ygorkayan.workers.dev/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) {
    alert("Login failed. Please check your credentials.");
    return { logged: false, token: "" };
  }

  const data = await response.json();

  return { logged: true, token: data.body };
};
