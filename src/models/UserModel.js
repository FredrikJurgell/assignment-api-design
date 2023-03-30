/**
 * Mongoose model User.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'

const { isEmail } = validator

// Create a schema.

const schema = new mongoose.Schema({

  username: {
    type: String,
    pattern: [/^[A-Za-z][A-Za-z0-9_-]{2,255}$/],
    required: [true, 'Username is required.'],
    unique: true
  },
  password: {
    type: String,
    minLength: [10, 'The password must be of minimum length 10 characters.'],
    maxLength: [256, 'The password must be of maximum length 256 characters.'],
    writeOnly: true,
    required: [true, 'Password is required.']
  },
  email: {
    type: String,
    maxLength: [256, 'The email must be of maximum length 256 characters.'],
    required: [true, 'Email address is required.'],
    unique: true,
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  webhookURL: {
    type: String
  },
  webhookSecretToken: {
    type: String
  }
})

// Salts and hashes password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
  if (this.webhookSecretToken) {
    this.webhookSecretToken = await bcrypt.hash(this.webhookSecretToken, 10)
  }
})

/**
 * Authenticates a user.
 *
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<User>} A Promise that resolves to the authenticated user.
 * @throws {Error} If no user is found with the given username, or if the password is incorrect.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    throw new Error('Invalid credentials.')
  }

  // User found and password correct, return the user.
  return user
}

// Create a model using the schema.
export const UserModel = mongoose.model('User', schema)
