import { Controller, HttpRequest, HttpResponse, LoadSurveys } from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller {
  constructor(
    private readonly loadSurveys: LoadSurveys
  ) { }

  // @ts-ignore
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
  }
}
