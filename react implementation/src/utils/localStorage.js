import { toast } from "react-hot-toast";

export const LS_TICKETS = "ticketflow::tickets_v1";
export const LS_USERS = "ticketflow::users_v1";

export const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error("readLS error:", err);
    toast.error("Failed to read from localStorage. Some data may be unavailable.");
    return fallback;
  }
};

export const writeLS = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error("writeLS error:", err);
    toast.error("Failed to save data locally. Please check storage settings.");
  }
};