/**
 * API version 1 routes.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { CatchController } from '../../../controllers/api/CatchController.js'

export const router = express.Router()

const controller = new CatchController()
/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, Buffer.from(process.env.ACCESS_TOKEN_SECRET_PUBLIC, 'base64'))
    req.user = {
      username: payload.username,
      email: payload.email,
      userId: payload.userId
    }

    next()
  } catch (err) {
    const error = createError(401, 'Access token invalid or not provided.')
    next(error)
  }
}

// Provide req.catch to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadCatch(req, res, next, id))

// GET catches
router.get('/', 
  authenticateJWT,
  (req, res, next) => controller.findAll(req, res, next)
)

// GET catches/:id
router.get('/:id',
  authenticateJWT,
  (req, res, next) => controller.find(req, res, next)
)

// POST catches
router.post('/',
  authenticateJWT,
  (req, res, next) => controller.create(req, res, next)
)

// PUT catches/:id
router.put('/:id',
  authenticateJWT,
  (req, res, next) => controller.update(req, res, next)
)

// DELETE catches/:id
router.delete('/:id',
  authenticateJWT,
  (req, res, next) => controller.delete(req, res, next)
)

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
