import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from "react-native-screens"

import AuthNavigator from "./app/navigation/app-navigator"

export default function App() {

  enableScreens()

  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
