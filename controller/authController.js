import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;
};
