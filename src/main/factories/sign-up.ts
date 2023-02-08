import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/sign-up/sign-up-controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export function makeSignUpController(): SignUpController {
  const emailValidatorAdapter = new EmailValidatorAdapter()

  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encrypterAdapter, accountMongoRepository)

  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
