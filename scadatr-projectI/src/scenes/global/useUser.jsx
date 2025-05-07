import { useEffect, useState } from "react";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar utilizador:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};
