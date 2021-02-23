import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'

import AuthNavigator from './app/navigation/app-navigator'
import { combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AuthReducer } from "./app/store/reducers/auth-reducer"
import { initFonts } from "./app/theme/font"

enableScreens()

const reducers = combineReducers({
  auth: AuthReducer
})

const store = createStore(reducers, applyMiddleware(ReduxThunk))

export default function App() {

  useEffect(() => {
    (async () => {
      await initFonts()
    })()
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
