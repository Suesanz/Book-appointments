import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as actionTypes from "./auth-action-types"
import { Dispatch } from "redux"

export const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userInfo = (await auth().createUserWithEmailAndPassword(email, password)).user

      await firestore().collection('authUsers').add({
        userId: userInfo.uid,
        username,
        email: email.toLowerCase(),
      })

      dispatch ({
        type: actionTypes.SIGN_UP,
        payload: {
          username,
          email: userInfo.email,
          userId: userInfo.uid,
          isLoggedIn: true
        }
      })

    } catch (error) {
      console.warn('Error in signUp: ', error.message)

      let errorMessage
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!'
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Invalid credentials!'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Please enter a strong password!'
      }

      dispatch({
        type: actionTypes.SIGN_UP_ERROR,
        payload: {
          errorMessage: errorMessage,
          isLoggedIn: false,
          isLoading: false
        }
      })
    }
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {

    const userInfoFromFirestore = {
      username: null,
    }

    try {

      dispatch({ type: actionTypes.LOADING, payload: { isLoading: true } })

      const userInfo = (await auth().signInWithEmailAndPassword(email.toLowerCase(), password)).user

      const dataFromFirestore = await firestore().collection('authUsers').get()

      !dataFromFirestore.empty && dataFromFirestore.forEach(doc => {
        const item = doc.data()
        if (item.userId === userInfo.uid) {
          userInfoFromFirestore.username = item.username
        }
      })

      dispatch({ type: actionTypes.LOADING, payload: { isLoading: false } })

      dispatch ({
        type: actionTypes.LOGIN,
        payload: {
          username: userInfoFromFirestore.username,
          email: userInfo.email.toLowerCase(),
          userId: userInfo.uid,
          isLoggedIn: true
        }
      })

    } catch (error) {
      let errorMessage = 'The credentials are invalid or account is blocked!'

      if (['auth/auth/invalid-email', 'auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
        errorMessage = 'Invalid credentials!'
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account is blocked! Please contact support.'
      }

      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: {
          isLoggedIn: false,
          isLoading: false,
          errorMessage,
        }
      })
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch) => {
    const data = await auth().signOut()

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
