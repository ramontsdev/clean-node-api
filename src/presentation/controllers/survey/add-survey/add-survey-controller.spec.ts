import { badRequest } from '../../../helpers/http/http-helper';
import { AddSurveyController } from './add-survey-controller';
import { HttpRequest, Validation } from "./add-survey-controller-protocols";

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }]
    }
  }
}

function makeValidation() {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}


type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
}
function makeSut() {

  const validationStub = makeValidation()

  const sut = new AddSurveyController(validationStub)

  return {
    sut,
    validationStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
