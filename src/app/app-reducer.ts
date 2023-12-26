export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'SET-APP-STATUS':
      return {...state, status: action.status}
    case 'SET-APP-ERROR':
      return {...state, error: action.errorMessage}
    default:
      return state
  }
}

type ActionsType = SetAppStatusACType | SetAppErrorACType

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'SET-APP-STATUS',
    status
  } as const
}

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (errorMessage: string | null) => {
  return {
    type: 'SET-APP-ERROR',
    errorMessage
  } as const
}