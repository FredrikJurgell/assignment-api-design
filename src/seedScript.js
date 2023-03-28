/**
 * Seed script that fills storage with some data to play with when testing the API.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

import { CatchModel } from './models/CatchModel.js'
import { UserModel } from './models/UserModel.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.DB_CONNECTION_STRING
mongoose.connect(mongoURI)

const db = mongoose.connection

db.once('open', async () => {
  // Delete all existing data.
  await CatchModel.deleteMany({})
  await UserModel.deleteMany({})

  // Create some users.
  const users = await UserModel.create([
    {
      username: 'user1',
      password: 'password111',
      email: 'user1@example.com'
    },
    {
      username: 'user2',
      password: 'password222',
      email: 'user2@example.com'
    },
    {
      username: 'user3',
      password: 'password333',
      email: 'user3@example.com'
    }
  ])

  // Create some catches, referencing the users created above.
  await CatchModel.create([
    {
      userId: users[0]._id,
      position: 1,
      lakeOrRiver: 'Lake',
      city: 'Stockholm',
      species: 'Pike',
      weight: 5,
      length: 60,
      imageURL: 'https://example.com/image1.jpg',
      timestamp: new Date('2023-01-01')
    },
    {
      userId: users[1]._id,
      position: 2,
      lakeOrRiver: 'River',
      city: 'Gothenburg',
      species: 'Salmon',
      weight: 10,
      length: 80,
      imageURL: 'https://example.com/image2.jpg',
      timestamp: new Date('2023-02-01')
    },
    {
      userId: users[2]._id,
      position: 3,
      lakeOrRiver: 'Lake',
      city: 'Malmö',
      species: 'Trout',
      weight: 3,
      length: 40,
      imageURL: 'https://example.com/image3.jpg',
      timestamp: new Date('2023-03-01')
    }
  ])

  console.log('Data saved!')
  mongoose.connection.close()
})
