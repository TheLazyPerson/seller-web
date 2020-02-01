import { reducerStates, flashMessageTypes } from 'Constants/flashMessageConstants';

const initialState = {
  showMessage: false,
  messageType: '',
  message: '',
}

export default function loaderReducer(state = initialState, {type, payload}) {
switch (type) {
  case reducerStates.SHOW_FLASH_MESSAGE:
    return {
      ...state,
      showMessage: true,
      messageType: payload.messageType ? payload.messageType : flashMessageTypes.INFO,
      message: payload.message,
    }

  case "SHOW_API_ERROR_MESSAGE" :
    return {
      ...state,
      showMessage: true,
      messageType: flashMessageTypes.ERROR,
      message: payload.message,
    }

  case reducerStates.HIDE_FLASH_MESSAGE:
    return {
      ...state,
      showMessage: false,
    }

  default:      
    return state;
  }
}
