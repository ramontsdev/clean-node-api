import { LogMongoRepository } from "@/infra/db/mongodb/log-repository/log-mongo-repository"
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator"
import { Controller } from "@/presentation/protocols"

export function makeLogControllerDecorator(controller: Controller): Controller {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
