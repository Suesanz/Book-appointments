import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Login, BookAppointment, CheckAppointment, SignUp, Home, QRCode, Profile } from '../screens'
import { connect } from "react-redux"
import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { fonts } from "../theme/font"
import { Icon } from "react-native-elements"
import * as actions from "../store/actions"

const AuthStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const { width } = Dimensions.get('window')

const drawerContentOptions: DrawerContentOptions = {
  labelStyle: { fontSize: 14, color: '#000000' },
  activeTintColor: '#e91e63',
}

const styles = StyleSheet.create({

  DrawerStyle: {
    width: width * 0.8
  } as ViewStyle,

  Container: {
    flex: 1,
    marginVertical: 20
  } as ViewStyle,

  DrawerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginVertical: 16
  } as ViewStyle,

  DrawerText: {
    fontSize: 14,
    marginLeft: 16,
    fontFamily: fonts.semibold,
  } as TextStyle,

  DrawerIcon: {
    height: 48,
    marginLeft: 16,
    marginRight: 8,
  } as TextStyle

})

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Profile'} onPress={() => { props.navigation.navigate('ProfileScreen') }}
        icon={() => <Icon name={'emotsmile'} type={'simple-line-icon'} />}
        style={{ height: 60, justifyContent: 'center', borderBottomWidth: 1, borderRadius: 0 }}
      />
      <DrawerItem label={'Home'} onPress={() => { props.navigation.navigate('HomeScreen') }} icon={() => <Icon name={'home'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Book Appointment'} onPress={() => { props.navigation.navigate('BookAppointmentScreen') }} icon={() => <Icon name={'notebook'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Check Appointment'} onPress={() => { props.navigation.navigate('CheckAppointmentScreen') }} icon={() => <Icon name={'check'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Logout'} onPress={() => { props.logout() }} icon={() => <Icon name={'logout'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Dark Mode'} onPress={() => {}} icon={() => <Icon name={'theme-light-dark'} type={'material-community'} />}/>
      <DrawerItem label={'App version 0.1'} onPress={() => {}} icon={() => <Icon name={'versions'} type={'octicon'} />} />
    </DrawerContentScrollView>
  )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
})

const CustomDrawer = connect(null, mapDispatchToProps)(DrawerContent)

const AuthNavigator = (props) => {

  return (
    <>
      {!props.isLoggedIn
        ? <AuthStack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false, gestureEnabled: true }}>
          <AuthStack.Screen name={'LoginScreen'} component={Login}/>
          <AuthStack.Screen name={'SignUpScreen'} component={SignUp}/>
        </AuthStack.Navigator>
        : <Drawer.Navigator
          screenOptions={{ headerShown: false, swipeEnabled: true }}
          drawerStyle={styles.DrawerStyle}
          drawerContentOptions={drawerContentOptions}
          drawerContent={(props) => <CustomDrawer {...props}/>}
          drawerType={'front'}
          openByDefault={false}
          lazy={true}
          {...props}
        >
          <Drawer.Screen options={{ drawerIcon: () => (<Icon name={'face'}/>) }} name={'HomeScreen'} component={Home}/>
          <Drawer.Screen name={'ProfileScreen'} component={Profile}/>
          <Drawer.Screen name={'BookAppointmentScreen'} component={BookAppointment}/>
          <Drawer.Screen name={'CheckAppointmentScreen'} component={CheckAppointment}/>
          <Drawer.Screen name={'QRCodeScreen'} component={QRCode}/>
        </Drawer.Navigator>

      }
    </>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(AuthNavigator)
