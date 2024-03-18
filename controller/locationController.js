import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.location.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createLocation = async (req, res) => {
  const { latitude, longitude, deviceToken } = req.body;
  try {
    const response = await prisma.location.create({
      data: {
        latitude,
        longitude,
        deviceToken,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};
