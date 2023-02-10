import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../sign-up/sign-up-protocols";

export class LoginController implements Controller {

  constructor(private readonly emailValidator: EmailValidator) { }

  // @ts-ignore
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!password)
        return badRequest(new MissingParamError('password'))

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
