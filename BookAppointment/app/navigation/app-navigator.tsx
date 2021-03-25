import React, { useEffect, useRef, useState } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Login, BookAppointment, CheckAppointment, SignUp, Home, QRCode, Profile, ContactUs } from '../screens'
import { connect } from "react-redux"
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { fonts } from "../theme/font"
import { Icon } from "react-native-elements"
import * as actions from "../store/actions/auth-actions"
import storage from '@react-native-firebase/storage'
import { AnimatedCircularProgress } from "react-native-circular-progress"

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

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Profile'} onPress={() => { props.navigation.navigate('ProfileScreen') }}
        icon={() =>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => { props.navigation.navigate('ProfileScreen') }}>
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
                resizeMode={'stretch'}
                style={styles.ProfileImage}
                defaultSource={require('../screens/assets/image-placeholder.png')}
                onProgress={({ nativeEvent: { loaded, total } }) => { console.log('loaded', loaded); circularProgressRef.current.animate(100 / total * loaded, 500) }}
              />}
            </AnimatedCircularProgress>
            <Text style={{ fontFamily: fonts.semibold, fontSize: 18, width: '70%', textAlign: 'center' }}>{props.username}</Text>
          </TouchableOpacity>
        }
        style={{ height: 100, justifyContent: 'center', borderBottomWidth: 1, borderRadius: 0 }}
        labelStyle={{ color: '#FFFFFF' }}
      />
      <DrawerItem label={'Home'} onPress={() => { props.navigation.navigate('HomeScreen') }} icon={() => <Icon name={'home'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Book Appointment'} onPress={() => { props.navigation.navigate('BookAppointmentScreen') }} icon={() => <Icon name={'notebook'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Check Appointment'} onPress={() => { props.navigation.navigate('CheckAppointmentScreen') }} icon={() => <Icon name={'check'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'Dark Mode'} onPress={() => {}} icon={() => <Icon name={'theme-light-dark'} type={'material-community'} />}/>
      <DrawerItem label={'Contact us'} onPress={() => {props.navigation.navigate('ContactUs')}} icon={() => <Icon name={'contact-support'} type={'material'} />}/>
      <DrawerItem label={'Logout'} onPress={() => { props.logout() }} icon={() => <Icon name={'logout'} type={'simple-line-icon'} />}/>
      <DrawerItem label={'App version 0.1'} onPress={() => {}} icon={() => <Icon name={'versions'} type={'octicon'} activeOpacity={1}/>} />
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
          <Drawer.Screen name={'ContactUs'} component={ContactUs}/>
        </Drawer.Navigator>

      }
    </>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(AuthNavigator)
