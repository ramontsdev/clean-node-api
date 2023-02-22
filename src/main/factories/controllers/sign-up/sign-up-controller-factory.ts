import { SignUpController } from '../../../../presentation/controllers/sign-up/sign-up-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../use-cases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './sign-up-validation-factory'

export function makeSignUpController(): Controller {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())

  return makeLogControllerDecorator(signUpController)
}
