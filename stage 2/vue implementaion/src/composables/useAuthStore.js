import { ref, watch } from "vue";
import { readLS, writeLS } from "../utils/localStorage";
import { writeSession } from "../utils/session";

const initialUsers = [{ id: 1, email: "user@example.com", password: "password123" }];
const LS_KEY = "ticketflow::users_v1";

export const useAuthStore = () => {
  const users = ref(readLS(LS_KEY, initialUsers));

  watch(
    users,
    (newUsers) => {
      writeLS(LS_KEY, newUsers);
    },
    { deep: true }
  );

  const login = (email, password) => {
    const user = users.value.find((u) => u.email === email && u.password === password);
    if (user) {
      writeSession(email);
      return { ok: true };
    }
    return { ok: false, message: "Invalid email or password" };
  };

  const signup = (email, password) => {
    if (users.value.some((u) => u.email === email)) {
      return { ok: false, message: "Email already exists" };
    }
    const newUser = { id: Date.now(), email, password };
    users.value = [...users.value, newUser];
    writeSession(email);
    return { ok: true };
  };

  const logout = () => {
    // Session cleared in parent component
  };

  return { users, login, signup, logout };
};