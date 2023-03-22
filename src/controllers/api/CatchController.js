/**
 * Module for the CatchController.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { CatchModel } from '../../models/CatchModel.js'
import { UserModel } from '../../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class CatchController {
  /**
   * Loads a catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the task to load.
   */
  async loadCatch (req, res, next, id) {
    try {
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error
      err.cause.message = 'Access token invalid or not provided.'

      next(err)
    }
  }

  /**
   * Sends a JSON response containing a catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    try {
    } catch (error) {
      const err = createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.')

      next(err)
    }
  }

  /**
   * Sends a JSON response containing all catches.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
    } catch (error) {
      const err = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).')

      next(err)
    }
  }

  /**
   * Updates a specific catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  /**
   * Patches a specific catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async patch (req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await UserModel.authenticate(req.body.username, req.body.password)

      const payload = {
        username: user.username,
        email: user.email,
        userId: user._id
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'), {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(201)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401, 'Credentials invalid or not provided.')

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })

      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409, 'The username and/or email address is already registered.')
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).')
      }

      next(err)
    }
  }
}
