import type { Request, Response } from "express";

export const UserController = {
  addFriend: async (req: Request, res: Response) => {},
  getContacts: async (req: Request, res: Response) => {
    res.json({ message: "sucesso" });
  },
};
