import * as actionTypes from "../actions/profile-action-types"

const initialState = {
  userName: null,
  email: null,
  userId: null,
  photoURL: null,
  errorMessage: null,
  isLoading: false,
  gender: null,
  address: null,
}

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_PROFILE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.FETCH_PROFILE_ERROR: {
      return { ...state, ...action.payload }
    }

    case actionTypes.UPDATE_PROFILE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.UPDATE_PROFILE_ERROR: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SET_ADDRESS: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SET_GENDER: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SET_IMAGE_URI: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SUCCESS: {
      return { ...state, ...action.payload }
    }

    case actionTypes.LOADING: {
      return { ...state, ...action.payload }
    }

    case actionTypes.ERROR: {
      return { ...state, ...action.payload }
    }

    default: return state

  }

}
