import auth from '@react-native-firebase/auth'
import * as actionTypes from "./auth-action-types"
import { Dispatch } from "redux"

export const signUp = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(email, password)
      const userInfo = data.user
      // console.log('signUp Response', JSON.stringify(data))
      dispatch ({
        type: actionTypes.SIGN_UP,
        payload: {
          username: userInfo.displayName,
          email: userInfo.email,
          userId: userInfo.uid,
          photoURL: userInfo.photoURL,
          isLoggedIn: true
        }
      })

    } catch (error) {
      console.warn('Error in signUp: ', error.message)
      let errorMessage
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!'
      }

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!'
      }

      dispatch({
        type: actionTypes.SIGN_UP_ERROR,
        payload: {
          errorMessage: errorMessage,
          isLoggedIn: false
        }
      })
    }
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING, payload: { isLoading: true } })
      const data = await auth().signInWithEmailAndPassword(email, password)
      const userInfo = data.user
      // console.log('Login data', JSON.stringify(data))
      dispatch({ type: actionTypes.LOADING, payload: { isLoading: false } })

      dispatch ({
        type: actionTypes.LOGIN,
        payload: {
          username: userInfo.displayName,
          email: userInfo.email,
          userId: userInfo.uid,
          photoURL: userInfo.photoURL,
          isLoggedIn: true
        }
      })

    } catch (error) {
      console.log('Error in login: ', error.message)
      let errorMessage = 'The credentials are invalid or account is blocked!'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!'
      }

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!'
      }
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: {
          isLoggedIn: false,
          errorMessage
        }
      })
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch) => {
    const data = await auth().signOut()
    console.log('Logout data', JSON.stringify(data))

    dispatch ({
      type: actionTypes.LOGOUT,
      payload: {
        isLoggedIn: false
      }
    })

  }
}

export const setError = (errorMessage:string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.ERROR, payload: { errorMessage } })
  }
}

export const setLoading = (isLoading: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING, payload: { isLoading } })
  }
}
