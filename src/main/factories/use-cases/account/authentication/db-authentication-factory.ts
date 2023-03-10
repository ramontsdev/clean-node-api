import { DbAuthentication } from "@/data/use-cases/authentication/db-authentication";
import { Authentication } from "@/domain/use-cases/authentication";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account-repository/account-mongo-repository";
import env from "@/main/config/env";

export function makeDbAuthentication(): Authentication {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
