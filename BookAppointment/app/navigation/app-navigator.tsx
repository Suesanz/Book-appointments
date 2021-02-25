import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator, DrawerContentOptions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Login, BookAppointment, CheckAppointment, SignUp, Home, QRCode } from '../screens'
import { connect } from "react-redux"
import { Dimensions, Platform, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { fonts } from "../theme/font"
import { Icon } from "react-native-elements"

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
    // justifyContent: 'space-around',
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

const isIOS = Platform.OS === 'ios'

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props}/> */}
      <DrawerItem
        label={'Profile'} onPress={() => {}}
        icon={() => <Icon name={'emotsmile'} type={'simple-line-icon'} />}
        style={{ height: 60, justifyContent: 'center', borderBottomWidth: 1, borderRadius: 0 }}
      />
      <DrawerItem label={'Home'} onPress={() => { props.navigation.navigate('HomeScreen') }} icon={() => <Icon name={'home'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Book Appointment'} onPress={() => { props.navigation.navigate('BookAppointmentScreen') }} icon={() => <Icon name={'notebook'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Check Appointment'} onPress={() => { props.navigation.navigate('CheckAppointmentScreen') }} icon={() => <Icon name={'check'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Logout'} onPress={() => {}} icon={() => <Icon name={'logout'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Dark Mode'} onPress={() => {}} icon={() => <Icon name={'theme-light-dark'} type={'material-community'} />}/>
      <DrawerItem label={'App version 0.1'} onPress={() => {}} icon={() => <Icon name={'versions'} type={'octicon'} />} />
      {/* <TouchableOpacity style={styles.DrawerOptions}> */}
      {/*  <Icon name={'emotsmile'} type={'simple-line-icon'} style={{ marginRight: 10 }}/> */}
      {/*  <Text style={styles.DrawerText}>Profile</Text> */}
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.DrawerOptions}> */}
      {/*  <Icon name={'logout'} type={'simple-line-icon'} style={{ marginRight: 10 }}/> */}
      {/*  <Text style={styles.DrawerText}>Logout</Text> */}
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.DrawerOptions}> */}
      {/*  <Icon name={'theme-light-dark'} type={'material-community'} style={{ marginRight: 10 }}/> */}
      {/*  <Text style={styles.DrawerText}>Dark Mode</Text> */}
      {/* </TouchableOpacity> */}
      {/* <View/> */}
      {/* <View style={styles.DrawerOptions}> */}
      {/*  <Icon name={'versions'} type={'octicon'} size={35} style={{ marginRight: 10 }}/> */}
      {/*  <Text style={styles.DrawerText}>App version 0.1</Text> */}
      {/* </View> */}
    </DrawerContentScrollView>
  )
}

const AuthNavigator = (props) => {
  const drawerContent = (props) => <CustomDrawer {...props}/>
  return (
    <>
      {props.isLoggedIn
        ? <AuthStack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false, gestureEnabled: true }}>
          <AuthStack.Screen name={'LoginScreen'} component={Login}/>
          <AuthStack.Screen name={'SignUpScreen'} component={SignUp}/>
        </AuthStack.Navigator>
        : <Drawer.Navigator
          screenOptions={{ headerShown: false, swipeEnabled: true }}
          drawerStyle={styles.DrawerStyle}
          drawerContentOptions={drawerContentOptions}
          drawerContent={drawerContent}
          drawerType={'front'}
          openByDefault={false}
          {...props}
        >
          <Drawer.Screen options={{ drawerIcon: () => (<Icon name={'face'}/>) }} name={'HomeScreen'} component={Home}/>
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
