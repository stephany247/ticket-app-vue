import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";

export const useTicketStore = defineStore("ticket", {
  actions: {
    // Get current user's tickets
    getTickets() {
      const authStore = useAuthStore();
      return authStore.user?.tickets || [];
    },

    // Create Ticket
    createTicket(ticketData) {
      const authStore = useAuthStore();
      const user = authStore.user;
      if (!user) return { success: false, message: "User not logged in" };

      const newTicket = {
        id: Date.now().toString(),
        ...ticketData,
        createdAt: new Date().toISOString(),
      };

      const updatedUser = {
        ...user,
        tickets: [...(user.tickets || []), newTicket],
      };

      // Update localStorage session
      localStorage.setItem("ticketapp_session", JSON.stringify(updatedUser));

      // Update users list
      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));

      // Update Auth Store
      authStore.user = updatedUser;

      return { success: true, ticket: newTicket };
    },

    // Update Ticket
    updateTicket(id, updatedData) {
      const authStore = useAuthStore();
      const user = authStore.user;
      if (!user) return { success: false, message: "User not logged in" };

      const updatedTickets = user.tickets.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      );

      const updatedUser = { ...user, tickets: updatedTickets };

      localStorage.setItem("ticketapp_session", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));

      authStore.user = updatedUser;

      return { success: true };
    },

    // Delete Ticket
    deleteTicket(id) {
      const authStore = useAuthStore();
      const user = authStore.user;
      if (!user) return { success: false, message: "User not logged in" };

      const updatedTickets = user.tickets.filter((t) => t.id !== id);

      const updatedUser = { ...user, tickets: updatedTickets };
      localStorage.setItem("ticketapp_session", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));

      authStore.user = updatedUser;

      return { success: true };
    },
  },
});
