import { create } from "zustand";

interface UserInterface {
  id: string;
  fullname: string;
  email: string;
  profilePic: string;
}

type MyType = {
  authuser: null | UserInterface;
  setAuthUser: (user: UserInterface | null) => void;
  handleCheckAuth: () => Promise<void>;
  isChecking: boolean;
};

export const useAuth = create<MyType>((set) => ({
  authuser: null,
  isChecking: true,
  setAuthUser: (user) => set({ authuser: user }),
  handleCheckAuth: async () => {
    set({ isChecking: true });
    try {
      const response = await fetch("http://localhost:3000/api/auth/check", {
        credentials: "include",
      });

      if (!response.ok) {
        set({ authuser: null });
        return;
      }

      const data = await response.json();
      set({ authuser: data });
    } catch (err) {
      console.log(err);
      set({ authuser: null });
    } finally {
      set({ isChecking: false });
    }
  },
}));
