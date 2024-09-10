import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => {
    set({ users });
    console.log(users, "<-----distoree");
  },

  addUser: (user) => set((state) => ({ users: [user, ...state.users] })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  inUpdateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    })),
}));

export default useUserStore;
