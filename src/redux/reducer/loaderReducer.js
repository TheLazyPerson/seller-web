import { HIDE_LOADER, SHOW_LOADER } from 'Constants/loaderConstants';

const initialState = {
  showLoader: false
}

export default function loaderReducer(state = initialState, action) {
switch (action.type) {
  case SHOW_LOADER:
    return {
      showLoader: true
    }
  case HIDE_LOADER:
    return {
      showLoader: false
    }
  default:      
    return state;
  }
}
