import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Login, SignUp } from '../screens'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={'LoginScreen'} component={Login}/>
      <AuthStack.Screen name={'SignUpScreen'} component={SignUp}/>
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
