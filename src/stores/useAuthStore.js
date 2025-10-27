import { defineStore } from "pinia";

// Session duration: 1 hour
const SESSION_DURATION = 1000 * 60 * 60;

const getStoredSession = () => {
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  if (!session) return null;

  // Check expiry
  if (Date.now() > session.expiry) {
    localStorage.removeItem("ticketapp_session");
    return null;
  }

  return session;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getStoredSession(),
    isAuthenticated: !!getStoredSession(),
    loading: false,
  }),

  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        // simulate API delay
        await new Promise((r) => setTimeout(r, 1000));
        const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];

        const existingUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (!existingUser) throw new Error("Invalid credentials. Please try again.");

        const sessionData = {
          ...existingUser,
          expiry: Date.now() + SESSION_DURATION,
        };
        localStorage.setItem("ticketapp_session", JSON.stringify(sessionData));

        this.user = sessionData;
        this.isAuthenticated = true;
        this.loading = false;
        return { success: true, user: sessionData };
      } catch (error) {
        this.loading = false;
        return { success: false, message: error.message };
      }
    },

    async register(name, email, password) {
      this.loading = true;
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];

        if (users.some((u) => u.email === email))
          throw new Error("Email already registered");

        const newUser = { name, email, password, tickets: [] };
        users.push(newUser);
        localStorage.setItem("ticketapp_users", JSON.stringify(users));

        const sessionData = {
          ...newUser,
          expiry: Date.now() + SESSION_DURATION,
        };
        localStorage.setItem("ticketapp_session", JSON.stringify(sessionData));

        this.user = sessionData;
        this.isAuthenticated = true;
        this.loading = false;
        return { success: true, user: sessionData };
      } catch (error) {
        this.loading = false;
        return { success: false, message: error.message };
      }
    },

    logout() {
      localStorage.removeItem("ticketapp_session");
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
