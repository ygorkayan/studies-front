import { URL_LOGIN } from "../../global";

export const login = async (user: string, password: string) => {
  const response = await fetch(URL_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) {
    return { logged: false, token: "" };
  }

  const data = await response.json();

  return { logged: true, token: data.body };
};

export const checkToken = async (token: string | null) => {
  if (token === null) {
    return false;
  }

  const res = await fetch(URL_LOGIN, {
    method: "GET",
    headers: {
      token: token || "",
    },
  });

  if (res.status === 200) {
    return true;
  }

  return false;
};
