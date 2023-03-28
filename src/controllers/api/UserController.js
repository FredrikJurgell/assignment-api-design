/**
 * Module for the UserController.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import { UserModel } from '../../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
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
        email: req.body.email,
        webhookURL: req.body.webhookURL,
        webhookSecretToken: req.body.webhookSecretToken
      })

      await user.save()

      const db = user.db
      const numberOfUsers = await db.collection('users').countDocuments()

      const users = await db.collection('users').find()

      await users.forEach((user) => {
        if (user.webhookURL !== undefined) {
          fetch(user.webhookURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-assignment-api-design-token': user.webhookSecretToken
            },
            body: JSON.stringify({
              numberOfUsers
            })
          })
        }
      })

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
        console.log(error)
        err = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).')
      }

      next(err)
    }
  }
}
