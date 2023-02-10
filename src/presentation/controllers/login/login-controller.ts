import { Authentication } from "../../../domain/use-cases/authentication";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError, unauthorized } from "../../helpers/http-helper";
import { Controller, EmailValidator, HttpRequest, HttpResponse } from "./login-protocols";

export class LoginController implements Controller {

  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) { }

  // @ts-ignore
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field))
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }

    } catch (error) {
      return serverError(error as Error)
    }
  }
}
