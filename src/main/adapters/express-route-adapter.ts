import { Request, Response } from "express";
import { Controller, HttpRequest } from "../../presentation/protocols";

export function adaptRoute(controller: Controller) {
  return async function (req: Request, res: Response) {

    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
