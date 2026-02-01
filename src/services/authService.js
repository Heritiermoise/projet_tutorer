import api from "../api/axios";

export const login = async (email, password) => {
  // 1️⃣ Récupérer le cookie CSRF de Laravel
  await api.get("/sanctum/csrf-cookie");

  // 2️⃣ Login
  const response = await api.post("/api/login", { email, password });

  // 3️⃣ Stocker le token (optionnel si tu utilises les tokens Bearer)
  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  await api.post("/api/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("token");
};
