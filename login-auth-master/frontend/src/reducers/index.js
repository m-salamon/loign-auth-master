import { combineReducers } from 'redux';
import { submitReducer, formISSubmitedReducer, userProfile } from './formReducer'
import { authenticated, errorsReducer, spinnerReducer } from './utilsReducer'

const rootReducer = combineReducers({
   errorsReducer,
   spinnerReducer,
   authenticated,
   formIsSubmited: formISSubmitedReducer,
   shouldSubmit: submitReducer,
   userProfile
});

export default rootReducer