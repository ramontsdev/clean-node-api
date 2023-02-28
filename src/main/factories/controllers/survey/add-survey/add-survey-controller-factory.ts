import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbAddSurvey } from "@/main/factories/use-cases/survey/add-survey/db-add-survey-factory";
import { AddSurveyController } from "@/presentation/controllers/survey/add-survey/add-survey-controller";
import { Controller } from "@/presentation/protocols";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";

export function makeAddSurveyController(): Controller {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())

  return makeLogControllerDecorator(controller)
}
