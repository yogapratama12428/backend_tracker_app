import express from 'express'
import { login, logout, register } from '../controller/authController.js'

const router = express.Router()

router.post('/api/v1/register', register)
router.post('/api/v1/login', login)
router.post('/api/v1/logout', logout)

export default router