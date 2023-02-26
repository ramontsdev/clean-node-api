import { Validation } from "../../../../../presentation/protocols/validation"
import { EmailValidator } from '../../../../../validation/protocols/email-validator'
import {
  CompareFieldsValidation, EmailValidation,
  RequiredFieldValidation, ValidationComposite
} from '../../../../../validation/validators'
import { makeSignUpValidation } from "./sign-up-validation-factory"

jest.mock("../../../../../validation/validators/validation-composite")

function makeEmailValidator(): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation', () => {
  test('Should call ValidationComposite with All validations', () => {

    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
