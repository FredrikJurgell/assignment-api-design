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
      // Get the catch.
      const theCatch = await CatchModel.findById(id)

      // If no catch found send a 404 (Not Found).
      if (!theCatch) {
        next(createError(404))
        return
      }

      // Provide the catch to req.
      req.theCatch = theCatch

      // Next middleware.
      next()
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
      const theCatch = await CatchModel.findOne({ userId: req.user.userId, _id: req.theCatch._id })

      if (theCatch) {
        res.json(theCatch)
      } else {
        const err = createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.')
        next(err)
      }
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
      const catches = await CatchModel.find({ userId: req.user.userId })

      res.json(catches)
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
      const theCatch = new CatchModel({
        userId: req.body.userId,
        position: req.body.position,
        lakeOrRiver: req.body.lakeOrRiver,
        city: req.body.city,
        species: req.body.species,
        weight: req.body.weight,
        length: req.body.length,
        imageURL: req.body.imageURL
      })

      await theCatch.save()

      res
        .status(201)
        .json(theCatch)
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
      const theCatch = await CatchModel.findOne({ userId: req.user.userId, _id: req.theCatch._id })

      if (theCatch !== null) {
        req.theCatch.position = req.body.position || req.theCatch.position
        req.theCatch.lakeOrRiver = req.body.lakeOrRiver || req.theCatch.lakeOrRiver
        req.theCatch.city = req.body.city || req.theCatch.city
        req.theCatch.species = req.body.species || req.theCatch.species
        req.theCatch.weight = req.body.weight || req.theCatch.weight
        req.theCatch.length = req.body.length || req.theCatch.length
        req.theCatch.imageURL = req.body.imageURL || req.theCatch.imageURL

        await req.theCatch.save({ userId: req.user.userId })

        res
          .status(204)
          .end()
      } else {
        const err = createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.')
        next(err)
      }
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
      const theCatch = await CatchModel.findOne({ userId: req.user.userId, _id: req.theCatch._id })

      if (theCatch !== null) {
        req.theCatch.position = req.body.position || req.theCatch.position
        req.theCatch.lakeOrRiver = req.body.lakeOrRiver || req.theCatch.lakeOrRiver
        req.theCatch.city = req.body.city || req.theCatch.city
        req.theCatch.species = req.body.species || req.theCatch.species
        req.theCatch.weight = req.body.weight || req.theCatch.weight
        req.theCatch.length = req.body.length || req.theCatch.length
        req.theCatch.imageURL = req.body.imageURL || req.theCatch.imageURL

        await req.theCatch.save({ userId: req.user.userId })

        res
          .status(204)
          .end()
      } else {
        const err = createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.')
        next(err)
      }
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
      const theCatch = await CatchModel.findOne({ userId: req.user.userId, _id: req.theCatch._id })
      if (theCatch !== null) {
        await req.theCatch.deleteOne({ userId: req.user.userId })
  
        res
          .status(204)
          .end()
      } else {
        const err = createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.')
        next(err)
      }
    } catch (error) {
      next(error)
    }
  }
}
