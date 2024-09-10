import { create } from "zustand";

const useAuthStore = create((set) => ({
  currentUser: {},
  setAuth: (auth) => set({ currentUser: auth }),
}));

export default useAuthStore;
