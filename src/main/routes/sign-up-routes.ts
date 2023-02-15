import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeSignUpController } from "../factories/sign-up/sign-up-factory";

export default function (router: Router): void {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
}
