import { LoginController } from "../../../../../presentation/controllers/login/login/login-controller";
import { Controller } from "../../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { makeDbAuthentication } from "../../../use-cases/account/authentication/db-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export function makeLoginController(): Controller {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())

  return makeLogControllerDecorator(loginController)
}
