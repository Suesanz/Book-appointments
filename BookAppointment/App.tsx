import React, { useEffect, useState } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
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

enableScreens()

const reducers = combineReducers({
  auth: AuthReducer
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

  const onAuthStateChanged = (user) => {
    // setUser(user)
    if (user) {
      store.dispatch({ type: actionTypes.LOGGEDIN, payload: { isLoggedIn: true } })
    } else {
      store.dispatch({ type: actionTypes.LOGGEDIN, payload: { isLoggedIn: false } })
    }
    console.log('onAuthStateChanged', !!user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    (async () => {
      await initFonts()
      const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
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
