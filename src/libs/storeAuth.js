import { create } from "zustand";

const useAuthStore = create((set) => ({
  currentUser: null,
  setAuth: (auth) => set({ currentUser: auth }),
  resetAuth: () => set({ currentUser: null }),
}));

export default useAuthStore;
