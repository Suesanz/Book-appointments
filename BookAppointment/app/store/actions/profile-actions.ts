import { Dispatch } from 'redux'
import firestore from '@react-native-firebase/firestore'
import * as actionTypes from './profile-action-types'

export const fetchProfile = () => {
  return async (dispatch: Dispatch, getState) => {
    const state = getState()
    console.log('state', state.auth.email)
    try {
      const collection = await firestore().collection('authUsers')

      const docSnapshot = await collection.where('email', '==', state.auth.email).get()
      if (!docSnapshot.empty) {
        docSnapshot.forEach(doc => {
          const item = doc.data()
          dispatch({
            type: actionTypes.FETCH_PROFILE,
            payload: {
              address: item?.address || '',
              gender: item?.gender || null
            }
          })
        })

      } else {
        dispatch({
          type: actionTypes.FETCH_PROFILE_ERROR,
          payload: {
            errorMessage: 'Record not found. Please contact support.'
          }
        })
      }

    } catch (err) {
      console.error('Error from updateAppointment', err)
      dispatch({
        type: actionTypes.FETCH_PROFILE_ERROR,
        payload: {
          errorMessage: 'Failed to update profile. Please try again.'
        }
      })
    }
  }

}

export const updateProfile = (email: string, gender: string, address: string) => {
  return async (dispatch: Dispatch) => {

    try {
      const collection = await firestore().collection('authUsers')
      console.log('email', email, gender, address)
      const docSnapshot = await collection.where('email', '==', email).get()
      if (!docSnapshot.empty) {
        await docSnapshot.docs[0].ref.update({ gender, address })
        dispatch({
          type: actionTypes.SUCCESS,
          payload: {
            message: { success: true, msg: 'Profile updated successfully.' }
          }
        })
      } else {
        dispatch({
          type: actionTypes.UPDATE_PROFILE_ERROR,
          payload: {
            message: { success: false, msg: 'Record not found. Please contact support.' }
          }
        })
      }

      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: {
          gender,
          address
        }
      })
      dispatch({
        type: actionTypes.SUCCESS,
        payload: {
          message: { success: true, msg: 'Profile updated successfully.' }
        }
      })

    } catch (err) {
      console.error('Error from updateAppointment', err)
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
        payload: {
          message: { success: false, msg: 'Failed to update profile. Please try again.' }
        }
      })
    }
  }

}

export const setError = (errorMessage:string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.ERROR, payload: { message: errorMessage, success: false } })
  }
}

export const setLoading = (isLoading: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING, payload: { isLoading } })
  }
}

export const setAddress = (address: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.SET_ADDRESS, payload: { address } })
  }
}

export const setGender = (gender: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.SET_GENDER, payload: { gender } })
  }
}

export const setImageUri = (imageUri: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.SET_IMAGE_URI, payload: { imageUri } })
  }
}
