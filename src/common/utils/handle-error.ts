import { isAxiosError } from 'axios'
import { setAppErrorAC } from '../../app/app-reducer.ts'
import { Dispatch } from 'redux'

export const handleError = (e: unknown, dispatch: Dispatch) => {
  let errorMessage: string
  if (isAxiosError<ServerErrorType>(e)) {
    errorMessage = e.response? e.response.data.errorMessages[0].message : e.message
  } else errorMessage = (e as Error).message
  dispatch(setAppErrorAC(errorMessage))
  console.log(errorMessage)
}

type ServerErrorType = {
  errorMessages: Array<{field: string; message: string}>
}