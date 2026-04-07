import { Socket } from "socket.io";
import { UserType } from "../models/User";

declare module "socket.io" {
  interface Socket {
    user?: UserType | null;
  }
}
