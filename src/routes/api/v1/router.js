/**
 * API version 1 routes.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import express from 'express'
import { router as catchesRouter } from './catchesRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as hookRouter } from './hookRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.use('/catches', catchesRouter)
router.use('/user', userRouter)
router.use('/webhook', hookRouter)
