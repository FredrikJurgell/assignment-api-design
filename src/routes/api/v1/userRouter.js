/**
 * User routes.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import { UserController } from '../../../controllers/api/UserController.js'

export const router = express.Router()

const controller = new UserController()

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
