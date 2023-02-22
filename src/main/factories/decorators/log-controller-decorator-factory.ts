import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log-mongo-repository"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller-decorator"

export function makeLogControllerDecorator(controller: Controller): Controller {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
