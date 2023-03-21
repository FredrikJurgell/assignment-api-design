/**
 * Module for the CatchController.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import createError from 'http-errors'
import { CatchModel } from '../../models/CatchModel.js'

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
}
