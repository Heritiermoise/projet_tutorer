// src/hooks/useAuth.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Login
  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setErrors({});
    try {
      // 1️⃣ CSRF cookie pour Sanctum
      await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // 2️⃣ Login avec POST JSON
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔑 Stocker token et user
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (rememberMe) localStorage.setItem("rememberMe", "true");

        setUser(data.user);
        setToken(data.token);

        navigate("/dashboard", { replace: true });
      } else {
        setErrors({ submit: data.message || "Email ou mot de passe incorrect" });
      }
    } catch (err) {
      console.error("Erreur login:", err);
      setErrors({ submit: "Erreur serveur. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
      }
    } catch (err) {
      console.error("Erreur logout:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      setUser(null);
      setToken(null);
      navigate("/login", { replace: true });
    }
  };

  // ✅ Vérifier si l’utilisateur est connecté
  const fetchUser = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        logout();
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Erreur fetchUser:", err);
      logout();
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, token, loading, errors, login, logout };
};
