import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Login, BookAppointment, SignUp, Home } from '../screens'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: true }}>
      <AuthStack.Screen name={'LoginScreen'} component={Login}/>
      <AuthStack.Screen name={'SignUpScreen'} component={SignUp}/>
      <AuthStack.Screen name={'HomeScreen'} component={Home}/>
      <AuthStack.Screen name={'BookAppointmentScreen'} component={BookAppointment}/>
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
