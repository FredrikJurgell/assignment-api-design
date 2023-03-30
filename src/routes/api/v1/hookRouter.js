/**
 * Hook routes.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import express from 'express'
import { HookController } from '../../../controllers/api/HookController.js'
import { UserController } from '../../../controllers/api/UserController.js'

export const router = express.Router()

const controller = new HookController()
const userController = new UserController()
// Map HTTP verbs and route paths to controller actions.
router.post('/register', controller.registerWebhook, userController.register)
