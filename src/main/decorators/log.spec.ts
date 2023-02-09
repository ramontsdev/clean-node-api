import { LogErrorRepository } from "../../data/protocols/log-error-repository"
import { AccountModel } from "../../domain/models/account"
import { created, serverError } from "../../presentation/helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"

function makeLogErrorRepository(): LogErrorRepository {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {

    }
  }

  return new LogErrorRepositoryStub()
}

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    }
  }
}

function makeFakeAccount(): AccountModel {
  return {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password'
  }
}

function makeController(): Controller {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = created(makeFakeAccount())
      return httpResponse
    }
  }

  return new ControllerStub()
}

function makeFakeServerError() {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'

  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
function makeSut(): SutTypes {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(makeFakeRequest())

    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(created(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(makeFakeServerError()))
      )

    await sut.handle(makeFakeRequest())

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
