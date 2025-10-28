import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
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

const LS_KEY = "ticketflow::tickets_v1";

export const useTicketStore = () => {

  const toast = useToast();
  const tickets = ref(readLS(LS_KEY, initialTickets));

  watch(
    tickets,
    (newTickets) => {
      writeLS(LS_KEY, newTickets);
    },
    { deep: true }
  );

  const createTicket = (payload) => {
    const newTicket = {
      id: Date.now(),
      createdAt: Date.now(),
      ...payload,
    };
    tickets.value = [newTicket, ...tickets.value];
    toast.success("Ticket created");
    return newTicket;
  };

  const updateTicket = (id, payload) => {
    tickets.value = tickets.value.map((x) => (x.id === id ? { ...x, ...payload } : x));
    toast.success("Ticket updated");
  };

  const deleteTicket = (id) => {
    tickets.value = tickets.value.filter((x) => x.id !== id);
    toast.success("Ticket deleted");
  };

  const setTickets = (newTickets) => {
    tickets.value = newTickets;
  };

  return {
    tickets,
    createTicket,
    updateTicket,
    deleteTicket,
    setTickets,
  };
};