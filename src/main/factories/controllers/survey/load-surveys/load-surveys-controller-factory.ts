import { LoadSurveysController } from "../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller";
import { Controller } from "../../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { makeDbLoadSurveys } from "../../../use-cases/survey/load-surveys/db-load-surveys";

export function makeLoadSurveysController(): Controller {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogControllerDecorator(controller)
}
