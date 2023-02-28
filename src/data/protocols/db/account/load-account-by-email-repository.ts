import { AccountModel } from "@/data/use-cases/add-account/db-add-account-protocols";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel | null>
}
