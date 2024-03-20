import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const response = await prisma.user.findMany({});
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        devices: true,
      },
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const createUser = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await prisma.user.create({
      data: {
        email,
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.user.delete({
      where: {
        id,
      },
      include: {
        devices: true,
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};
