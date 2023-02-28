import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveys } from "@/main/factories/use-cases/survey/load-surveys/db-load-surveys";
import { LoadSurveysController } from "@/presentation/controllers/survey/load-surveys/load-surveys-controller";
import { Controller } from "@/presentation/protocols";

export function makeLoadSurveysController(): Controller {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogControllerDecorator(controller)
}
