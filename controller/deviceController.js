import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getDevice = async (req, res ) => {
    try {
        const response = await prisma.device.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json(error)
    }
} 

export const getDeviceById = async (req, res) => {
    const { id } = req.params
    
    try {
        const response = await prisma.device.findUnique({
            where: {
                id
            },
            include: {
                locations: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createDevice = async (req, res) => {
    const { name, isLock, userId } = req.body

    try {
        const response = await prisma.device.create({
            data: {
                name,
                userId,
                isLock
            }
        })
        res.status(201).json(response)
    } catch (e) {
        res.status(401).json(e)
    }
}

export const editDevice = async (req, res) => {
    const { name, isLock, userId } = req.body
    const { id } = req.params

    try {
        const response = await prisma.device.update({
            where: {
                id
            },
            data: {
                name,
                userId,
                isLock
            }
        })
        res.status(201).json(response)
    } catch (e) {
        res.status(401).json(e)
    }
}

export const deleteDevice = async (req, res) => { 
    const { id } = req.params

    try {
        const response = await prisma.device.delete({
            where: {
                id
            }
        })
        res.status(201).json(response)
    } catch (e) {
        res.status(401).json(e)
    }
}