import { Router } from "express";

import { adaptRoute } from "@/main/adapters/express/express-route-adapter";
import { makeLoginController } from "@/main/factories/controllers/login/login/login-controller-factory";
import { makeSignUpController } from "@/main/factories/controllers/login/sign-up/sign-up-controller-factory";

export default function (router: Router): void {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
