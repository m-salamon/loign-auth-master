import * as types from '../actions/types';

export function authenticated(state = [], action) {
    switch (action.type) {
        case types.AUTH_USER:
            return  true 
        case types.UNAUTH_USER:
            return  false 
        default:
            return state || false
    }
}

export function errorsReducer(state = [], action) {
   switch (action.type) {
       case types.ADD_ERROR_SUCCESS:
           return [...state, action.payload];
       case types.REMOVE_ERROR_SUCCESS:
           return state.filter((e) => e.name !== action.payload.name);
       default:
           return state
   }
}

export function spinnerReducer(state =  [], action) {
    switch (action.type) {
        case types.SPINNER:
            return action.payload;
        default:
            return state;
    }
}
