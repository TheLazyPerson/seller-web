import { reducerStates, flashMessageTypes } from 'Constants/flashMessageConstants';


export function showSuccessFlashMessage(message) {
  return dispatch => {
    dispatch({
      type: reducerStates.SHOW_FLASH_MESSAGE,
      payload: {
        messageType: flashMessageTypes.SUCCESS,
        message
      }
    })
  }
}

export function showInfoFlashMessage(message) {
  return dispatch => {
    dispatch({
      type: reducerStates.SHOW_FLASH_MESSAGE,
      payload: {
        messageType: flashMessageTypes.INFO,
        message,
      }
    })
  }
}

export function hideFlashMessage() {
  return dispatch => {
    dispatch({type: reducerStates.HIDE_FLASH_MESSAGE});
  }
}