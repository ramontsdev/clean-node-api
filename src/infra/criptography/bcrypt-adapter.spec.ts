import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
function makeSut(): BcryptAdapter {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hasSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hasSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
