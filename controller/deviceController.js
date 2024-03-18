import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const getDevice = async (req, res) => {
  try {
    const response = await prisma.device.findMany({});
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getDeviceById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.device.findUnique({
      where: {
        id,
      },
      select: {
        isLock: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createDevice = async (req, res) => {
  const { name, isLock, userId } = req.body;

  try {
    const response = await prisma.device.create({
      data: {
        name,
        userId,
        isLock,
        token: generateString(10),
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};

export const updateTokenDevice = async (req, res) => {
  const { deviceId } = req.params;

  try {
    const response = await prisma.device.update({
      where: {
        deviceId,
      },
      data: {
        token: generateString(10),
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(e);
  }
};

export const editDevice = async (req, res) => {
  const { name, isLock, userId, token } = req.body;
  const { id } = req.params;

  try {
    const response = await prisma.device.update({
      where: {
        id,
      },
      data: {
        name,
        userId,
        isLock,
        token,
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};

export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.device.delete({
      where: {
        id,
      },
    });
    res.status(201).json(response);
  } catch (e) {
    res.status(401).json(e);
  }
};
