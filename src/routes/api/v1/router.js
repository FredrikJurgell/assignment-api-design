/**
 * API version 1 routes.
 *
 * This module defines the routes for version 1 of the API.
 * All routes return responses with HATEOAS links.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import express from 'express'
import { router as catchesRouter } from './catchesRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as hookRouter } from './hookRouter.js'

export const router = express.Router()

router.get('/', (req, res) => {
  // HATEOAS response
  res.status(200).json({
    message: 'Welcome to version 1 of this very simple RESTful API!',
    links: {
      self: {
        href: `${req.protocol}://${req.get('host')}/api/v1/`,
        method: 'GET',
        type: 'application/json'
      },
      catches: {
        href: `${req.protocol}://${req.get('host')}/api/v1/catches`,
        method: 'GET',
        type: 'application/json'
      },
      user: {
        href: `${req.protocol}://${req.get('host')}/api/v1/user`,
        method: 'GET',
        type: 'application/json'
      },
      webhook: {
        href: `${req.protocol}://${req.get('host')}/api/v1/webhook`,
        method: 'GET',
        type: 'application/json'
      }
    }
  })
})
router.use('/catches', catchesRouter)
router.use('/user', userRouter)
router.use('/webhook', hookRouter)
