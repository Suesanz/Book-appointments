import * as actionTypes from "../actions/auth-action-types"

const initialState = {
  username: null,
  email: null,
  userId: null,
  errorMessage: null,
  isLoggedIn: false,
  isLoading: false
}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SIGN_UP: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SIGN_UP_ERROR: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOGIN: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOGIN_ERROR: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOGOUT: {
      return { ...state, ...action.payload }
    }

    case actionTypes.ERROR: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOADING: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOGGEDIN: {
      return { ...state, ...action.payload }
    }

    default: return state

  }

}
