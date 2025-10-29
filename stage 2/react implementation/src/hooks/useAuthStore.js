import { useState, useEffect } from "react";
import { readLS, writeLS } from "../utils/localStorage";
import { writeSession } from "../utils/session";

const initialUsers = [{ id: 1, email: "user@example.com", password: "password123" }];

export const useAuthStore = () => {
  const [users, setUsers] = useState(() => readLS("ticketflow::users_v1", initialUsers));
  
  useEffect(() => {
    writeLS("ticketflow::users_v1", users);
  }, [users]);

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      writeSession(email);
      return { ok: true };
    }
    return { ok: false, message: "Invalid email or password" };
  };

  const signup = (email, password) => {
    if (users.some((u) => u.email === email)) {
      return { ok: false, message: "Email already exists" };
    }
    const newUser = { id: Date.now(), email, password };
    setUsers((s) => [...s, newUser]);
    writeSession(email);
    return { ok: true };
  };

  const logout = () => {
    // Session cleared in parent component
  };

  return { users, login, signup, logout };
};