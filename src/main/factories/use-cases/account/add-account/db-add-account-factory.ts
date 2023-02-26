import { DbAddAccount } from "../../../../../data/use-cases/add-account/db-add-account";
import { AddAccount } from "../../../../../domain/use-cases/add-account";
import { BcryptAdapter } from "../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "../../../../../infra/db/mongodb/account-repository/account-mongo-repository";

export function makeDbAddAccount(): AddAccount {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
