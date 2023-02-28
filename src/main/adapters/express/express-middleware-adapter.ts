import { HttpRequest, Middleware } from "@/presentation/protocols";
import { NextFunction, Request, Response } from "express";

export function adaptMiddleware(middleware: Middleware) {
  return async function (req: Request, res: Response, next: NextFunction) {

    const httpRequest: HttpRequest = {
      headers: req.headers
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpRequest.body)
      next()
    }
    else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
