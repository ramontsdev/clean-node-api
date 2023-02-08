import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hasSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hasSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
