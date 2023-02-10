import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../sign-up/sign-up-protocols";

export class LoginController implements Controller {

  constructor(private readonly emailValidator: EmailValidator) { }

  // @ts-ignore
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password)
      return badRequest(new MissingParamError('password'))

    this.emailValidator.isValid(httpRequest.body.email)
  }
}