import { DbLoadSurveys } from '@/data/use-cases/load-surveys/db-load-surveys';
import { LoadSurveys } from "@/domain/use-cases/load-surveys";
import { SurveyMongoRepository } from "@/infra/db/mongodb/survey-repository/survey-mongo-repository";

export function makeDbLoadSurveys(): LoadSurveys {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveys(surveyMongoRepository)
}
