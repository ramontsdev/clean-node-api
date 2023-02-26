import { DbAddSurvey } from "../../../../../data/use-cases/add-survey/db-add-survey";
import { AddSurvey } from "../../../../../domain/use-cases/add-survey";
import { SurveyMongoRepository } from "../../../../../infra/db/mongodb/survey-repository/survey-mongo-repository";

export function makeDbAddASurvey(): AddSurvey {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbAddSurvey(surveyMongoRepository)
}
