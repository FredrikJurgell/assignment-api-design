/**
 * API version 1 routes.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import express from 'express'
import { CatchController } from '../../../controllers/api/CatchController.js'

export const router = express.Router()

const controller = new CatchController()

// Provide req.catch to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller(req).loadCatch(req, res, next, id))

// GET catches
router.get('/', (req, res, next) => controller(req).findAll(req, res, next))

// GET catches/:id
router.get('/:id', (req, res, next) => controller(req).find(req, res, next))

// POST catches
router.post('/', (req, res, next) => controller(req).create(req, res, next))

// PUT catches/:id
router.put('/:id', (req, res, next) => controller(req).update(req, res, next))

// DELETE catches/:id
router.delete('/:id', (req, res, next) => controller(req).delete(req, res, next))

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
