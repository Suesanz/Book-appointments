import Firebase from "../../config/firebase-config"
import * as actionTypes from "./auth-action-types"
import { Dispatch } from "redux"

export const signUp = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: Firebase.auth.UserCredential = await Firebase.auth().createUserWithEmailAndPassword(email, password)
      const userInfo = response.user
      console.log('signUp Response', JSON.stringify(response))
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

    } catch (err) {
      console.warn('err', err.message)
      dispatch({
        type: actionTypes.SIGN_UP_ERROR,
        payload: {
          errorMessage: err.message,
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
      const data: Firebase.auth.UserCredential = await Firebase.auth().signInWithEmailAndPassword(email, password)
      const userInfo = data.user
      console.log('data', JSON.stringify(data))
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

    } catch (err) {
      console.log('err', err.message)
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: {
          errorMessage: err.message,
          isLoggedIn: false
        }
      })
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch) => {
    const data = await Firebase.auth().signOut()
    console.log('data', JSON.stringify(data))

    dispatch ({
      type: actionTypes.LOGOUT,
      payload: {
        isLoggedIn: false
      }
    })

  }
}

export const setError = (errorMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.ERROR, payload: { errorMessage } })
  }
}

export const setLoading = (isLoading: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING, payload: { isLoading } })
  }
}
