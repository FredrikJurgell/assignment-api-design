/**
 * Mongoose model Catch.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const catchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  position: {
    type: Number,
    required: true
  },
  lakeOrRiver: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

// Create a model using the schema.
export const CatchModel = mongoose.model('Catch', catchSchema)
