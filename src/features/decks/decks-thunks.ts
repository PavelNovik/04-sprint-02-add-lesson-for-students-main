import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { AxiosError, isAxiosError } from 'axios'
import { handleError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    dispatch(setAppStatusAC('failed'))
  }
  // dispatch(setAppStatusAC('loading'))
  // decksAPI.fetchDecks().then((res) => {
  //   dispatch(setDecksAC(res.data.items))
  //   dispatch(setAppStatusAC('succeeded'))
  // }).catch((e) => {
  //   dispatch(setAppStatusAC('failed'))
  // })
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    handleError(e, dispatch)

    // let errorMessage: string
    // if (isAxiosError<ServerErrorType>(e)) {
    //   errorMessage = e.response? e.response.data.errorMessages[0].message : e.message
    // } else errorMessage = (e as Error).message
    // console.log(errorMessage)
  }

  // return decksAPI.updateDeck(params).then((res) => {
  //   dispatch(updateDeckAC(res.data))
  // })
}
//
// type ServerErrorType = {
//   errorMessages: Array<{field: string; message: string}>
// }