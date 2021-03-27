import React, { useEffect, useRef, useState } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Login, BookAppointment, CheckAppointment, SignUp, Home, QRCode, Profile, ContactMe } from '../screens'
import { connect } from "react-redux"
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { fonts } from "../theme/font"
import { Icon } from "react-native-elements"
import * as actions from "../store/actions/auth-actions"
import storage from '@react-native-firebase/storage'
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { RNWebView } from '../screens/webview/webview'

const AuthStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

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
  } as TextStyle,

  ProfileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  } as ImageStyle

})

const DrawerContent = (props) => {
  const [uri, setUri] = useState(null)
  const circularProgressRef = useRef<AnimatedCircularProgress>(null)

  const fetchProfileImage = async () => {
    try {
      const imageUrl = await storage().ref(`${props.email}-profile-image.png`).getDownloadURL()
      setUri(imageUrl)
    } catch (e) { }

  }

  useEffect(() => {
    fetchProfileImage().then()
  }, [])

  const getLabel = (focused: boolean, label: string) => {
    return <Text style={{ fontSize: 14, color: focused ? '#2189DC' : `rgba(0, 0, 0, 0.8)` }}>{label}</Text>
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Profile'} onPress={() => { props.navigation.navigate('ProfileScreen') }}
        icon={() =>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => { props.navigation.navigate('ProfileScreen') }}
          >
            <AnimatedCircularProgress
              ref={circularProgressRef}
              size={75}
              width={3}
              fill={0}
              prefill={0}
              tintColor="#2189DC"
              backgroundColor="#FFFFFF" >
              {() => <Image
                source={{ uri }}
                resizeMode={'cover'}
                style={styles.ProfileImage}
                defaultSource={require('../screens/assets/image-placeholder.png')}
                onProgress={({ nativeEvent: { loaded, total } }) => { circularProgressRef.current.animate(100 / total * loaded, 500) }}
              />}
            </AnimatedCircularProgress>
            <Text style={{ fontFamily: fonts.semibold, fontSize: 18, width: '70%', textAlign: 'center' }}>{props.username}</Text>
          </TouchableOpacity>
        }
        style={{ height: 100, justifyContent: 'center', borderBottomWidth: 2, borderRadius: 0, borderBottomColor: '#2189DC' }}
      />
      <DrawerItem label={({ focused }) => getLabel(focused, 'Home')} onPress={() => { props.navigation.navigate('HomeScreen') }} icon={() => <Icon name={'home'} type={'simple-line-icon'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'Book Appointment')} onPress={() => { props.navigation.navigate('BookAppointmentScreen') }} icon={() => <Icon name={'notebook'} type={'simple-line-icon'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'Check Appointment')} onPress={() => { props.navigation.navigate('CheckAppointmentScreen') }} icon={() => <Icon name={'check'} type={'simple-line-icon'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'Contact me')} onPress={() => { props.navigation.navigate('ContactUs') }} icon={() => <Icon name={'contact-support'} type={'material'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'Dark Mode (Coming Soon)')} onPress={() => {}} icon={() => <Icon name={'theme-light-dark'} type={'material-community'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'Logout')} onPress={() => { props.logout() }} icon={() => <Icon name={'logout'} type={'simple-line-icon'} />}/>
      <DrawerItem label={({ focused }) => getLabel(focused, 'App version 0.1')} onPress={() => {}} icon={() => <Icon name={'versions'} type={'octicon'} activeOpacity={1}/>} />
    </DrawerContentScrollView>
  )
}

const mapStateToDrawerProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
})

const CustomDrawer = connect(mapStateToDrawerProps, mapDispatchToProps)(DrawerContent)

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ stackAnimation: 'default', gestureEnabled: true, headerShown: false }} initialRouteName={'HomeScreen'}>
      <Stack.Screen name={'HomeScreen'} component={Home}/>
      <Stack.Screen name={'ProfileScreen'} component={Profile}/>
      <Stack.Screen name={'BookAppointmentScreen'} component={BookAppointment}/>
      <Stack.Screen name={'CheckAppointmentScreen'} component={CheckAppointment}/>
      <Stack.Screen name={'QRCodeScreen'} component={QRCode}/>
      <Stack.Screen name={'ContactUs'} component={ContactMe}/>
      <Stack.Screen name={'WebView'} component={RNWebView}/>
    </Stack.Navigator>
  )
}

const AuthNavigator = (props) => {

  return (
    <>
      {!props.isLoggedIn
        ? <AuthStack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false, gestureEnabled: true, stackAnimation: 'default' }}>
          <AuthStack.Screen name={'LoginScreen'} component={Login}/>
          <AuthStack.Screen name={'SignUpScreen'} component={SignUp}/>
        </AuthStack.Navigator>
        : <Drawer.Navigator
          screenOptions={{ headerShown: false, swipeEnabled: true, gestureEnabled: true }}
          drawerStyle={styles.DrawerStyle}
          drawerContentOptions={drawerContentOptions}
          drawerContent={(props) => <CustomDrawer {...props}/>}
          drawerType={'front'}
          openByDefault={false}
          lazy={true}
          {...props}
        >
          <Drawer.Screen name={'StackNavigator'} component={StackNavigator}/>
        </Drawer.Navigator>

      }
    </>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(AuthNavigator)
