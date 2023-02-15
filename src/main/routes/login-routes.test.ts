import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /sign-up', () => {
    test('Should return 201 an account on sign up', async () => {
      await request(app)
        .post('/api/sign-up')
        .send({
          name: 'Ramon',
          email: 'ramon@mail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(201)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Ramon',
        email: 'ramon@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'ramon@mail.com',
          password: '123'
        })
        .expect(200)
    })
  })

})
