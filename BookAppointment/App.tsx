import React, { useEffect, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import auth from '@react-native-firebase/auth'
import AuthNavigator from './app/navigation/app-navigator'
import { combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AuthReducer } from "./app/store/reducers/auth-reducer"
import { initFonts } from "./app/theme/font"
import * as actionTypes from "./app/store/actions/auth-action-types"
import messaging from '@react-native-firebase/messaging'
import { Alert } from "react-native"
import firestore from '@react-native-firebase/firestore'
import { ProfileReducer } from './app/store/reducers/profile-reducer'

enableScreens()

const reducers = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer
})

const store = createStore(reducers, applyMiddleware(ReduxThunk))

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
}

export default function App() {

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = async (user) => {
    // setUser(user)
    if (user) {
      const userInfoFromFirestore = {
        username: null,
        // email: null,
        // userId: null,
      }
      const dataFromFirestore = await firestore().collection('authUsers').get()

      !dataFromFirestore.empty && dataFromFirestore.forEach(doc => {
        const item = doc.data()
        if (item.userId === user.uid) {
          userInfoFromFirestore.username = item.username
        }
      })

      store.dispatch({
        type: actionTypes.LOGGEDIN,
        payload: {
          username: userInfoFromFirestore.username,
          email: user.email,
          userId: user.uid,
          isLoggedIn: true
        }
      })
    } else {
      store.dispatch({ type: actionTypes.LOGGEDIN, payload: { isLoggedIn: false } })
    }
    console.log('onAuthStateChanged', !!user)
    if (initializing) setInitializing(false)
  }

  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken()
  //   if (fcmToken) {
  //     console.log(fcmToken)
  //     console.log("Your Firebase Token is:", fcmToken)
  //   } else {
  //     console.log("Failed", "No token received")
  //   }
  // }
  //
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission()
  //   const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //
  //   if (enabled) {
  //     await getFcmToken() // <---- Add this
  //     console.log('Authorization status:', authStatus)
  //   }
  // }

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission({
      provisional: true,
    })

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.')
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.')
    } else {
      console.log('User has notification permissions disabled')
    }
  }

  useEffect(() => {
    (async () => {
      await initFonts()
      const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
      await checkApplicationPermission()
      const messagingSubscriber = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
      })

      return () => {
        authSubscriber()
        messagingSubscriber()
      }

    })()
  }, [])

  if (initializing) return null

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <AuthNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
