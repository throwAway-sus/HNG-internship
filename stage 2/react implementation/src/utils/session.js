import { toast } from "react-hot-toast";

export const LS_SESSION = "ticketapp_session";

export const readSession = () => {
  try {
    const raw = localStorage.getItem(LS_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("readSession error:", err);
    toast.error("Failed to read session. Please login again.");
    return null;
  }
};

export const writeSession = (email) => {
  try {
    localStorage.setItem(LS_SESSION, JSON.stringify({ email }));
  } catch (err) {
    console.error("writeSession error:", err);
    toast.error("Failed to write session.");
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(LS_SESSION);
  } catch (err) {
    console.error("clearSession error:", err);
  }
};

export const isAuthenticated = () => !!readSession();