import { isEmpty } from 'lodash';
import { isTypeSuccess } from 'Core/utils/validationHelper';
import { reducerStates } from '../../constants/flashMessageConstants';

/* payload error example :- 
    {
      message: "401 - ",
      name: "ApiError",
      response: {
        error: "invalid_credentials"
        message: "The user credentials were incorrect."
      }  
      status: 401
      statusText: ""
    }
*/

export default store => next => action => {
  const {
    payload, 
    type, //eg:- type: "PROJECTS_RECENT_CHECKINS_FAILURE"
    error, //eg:- error: true 
    meta //contains data provided in actions
  } = action

  if(isTypeSuccess(type) && payload.code == 500) {
    const {dispatch} = store;
    apiErrorAction(dispatch, payload.message);
  }
   

  return next(action)
}



/* --------------------------------------------------Helper Functions------------------------------------------- */

const apiErrorAction=(dispatch, message) => {
  dispatch({
    type: reducerStates.SHOW_FLASH_MESSAGE,
    payload: {
      message
    }
  })
}
