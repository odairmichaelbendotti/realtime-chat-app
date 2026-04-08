import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

interface UserInterface {
  _id: string;
  fullname: string;
  email: string;
  profilePic: string;
}

type OnlineUsers = {
  socketId: string;
  userId: string;
  name: string;
};

type MyType = {
  authuser: null | UserInterface;
  isChecking: boolean;
  setAuthUser: (user: UserInterface | null) => void;
  handleCheckAuth: () => Promise<void>;
  socket: Socket | null;
  onlineUsers: OnlineUsers[] | [];
  connectSocket: () => void;
  disconnectSocket: () => void;
  joinChat: () => void;
  userJoined: () => void;
};

export const useAuth = create<MyType>((set, get) => ({
  authuser: null,
  isChecking: true,
  socket: null,
  onlineUsers: [],

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
      get().connectSocket();
    } catch (err) {
      console.log(err);
      set({ authuser: null });
    } finally {
      set({ isChecking: false });
    }
  },
  connectSocket: () => {
    const { socket, authuser } = get();

    if (socket?.connected || !authuser) {
      console.log("Usuário já conectado ou sem fazer login");
      return;
    }

    // Ao chamar o io() ele já usa o socket.connect() por trás dos panos
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      newSocket?.emit("join-lobby", {
        userId: authuser?._id,
        name: authuser?.fullname,
      });
    });

    newSocket.on("users", (users: OnlineUsers[]) => {
      set({ onlineUsers: users });
    });

    set({ socket: newSocket });
  },
  disconnectSocket: () => {
    const { socket } = get();

    if (socket?.connected) {
      socket.disconnect();
    }

    set({ socket: null });
  },
  joinChat: () => {
    const { socket, authuser } = get();

    if (!socket?.connected) return;

    socket.emit("join_chat", {
      userId: authuser?._id,
      name: authuser?.fullname,
    });
  },
  userJoined: () => {
    const { socket } = get();

    if (!socket?.connected) return;

    socket.off("user_joined");

    socket.on("user_joined", (user) => {
      toast.success(`${user.name} joined the chat`);
    });
  },
}));
