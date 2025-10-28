import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { readLS, writeLS } from "../utils/localStorage";

export const initialTickets = [
  {
    id: 1,
    title: "Login issue",
    description: "Users can't login to the system",
    status: "open",
    priority: "high",
    createdAt: Date.now() - 86400000,
  },
  {
    id: 2,
    title: "UI Bug",
    description: "Buttons are misaligned on mobile",
    status: "in_progress",
    priority: "medium",
    createdAt: Date.now() - 3600 * 1000 * 24 * 3,
  },
  {
    id: 3,
    title: "Feature Request",
    description: "Add dark mode support",
    status: "closed",
    priority: "low",
    createdAt: Date.now() - 3600 * 1000 * 24 * 7,
  },
];

export const useTicketStore = () => {
  const [tickets, setTickets] = useState(() => {
    return readLS("ticketflow::tickets_v1", initialTickets);
  });

  useEffect(() => {
    writeLS("ticketflow::tickets_v1", tickets);
  }, [tickets]);

  const createTicket = (payload) => {
    const newTicket = {
      id: Date.now(),
      createdAt: Date.now(),
      ...payload,
    };
    setTickets((t) => [newTicket, ...t]);
    toast.success("Ticket created");
    return newTicket;
  };

  const updateTicket = (id, payload) => {
    setTickets((t) => t.map((x) => (x.id === id ? { ...x, ...payload } : x)));
    toast.success("Ticket updated");
  };

  const deleteTicket = (id) => {
    setTickets((t) => t.filter((x) => x.id !== id));
    toast.success("Ticket deleted");
  };

  return {
    tickets,
    createTicket,
    updateTicket,
    deleteTicket,
    setTickets,
  };
};