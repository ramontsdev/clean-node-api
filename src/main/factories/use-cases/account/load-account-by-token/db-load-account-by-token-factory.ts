import { DbLoadAccountByToken } from "@/data/use-cases/load-account-by-token/db-load-account-by-token";
import { LoadAccountByToken } from "@/domain/use-cases/load-account-by-token";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account-repository/account-mongo-repository";
import env from "@/main/config/env";

export function makeDbLoadAccountByToken(): LoadAccountByToken {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
