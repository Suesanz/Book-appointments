import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { BlurView } from "@react-native-community/blur"
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import CheckAppointment from '../screens/assets/book-appointment.json'
import BookAppointment from '../screens/assets/check-appointment.json'
import { CardView } from "../components/card-view-animated"

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25
  } as ViewStyle,

  HeaderContainer: {
    // flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19',
    marginBottom: 25,
  } as TextStyle,

  SubWelcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#9EABB5',
  } as TextStyle,

  BookAppointmentContainer: {
    height: 150,
    // borderWidth: 1,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderColor: '#2288DC',
    borderRadius: 10,
    // shadowColor: '#000000',
    // shadowOffset: { width: 12, height: 12 },
    // shadowRadius: 10,
    // elevation: 10,
    // backgroundColor: 'transparent'
  } as ViewStyle

})

export const Home = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  return (
    <ImageBackground source={require('../screens/assets/appointment-background-2.png')} style={{ flex: 1, opacity: 1 }} resizeMode={'cover'}>
      <SafeAreaView style={styles.Container}>
        <Text style={styles.WelcomeText}>Welcome,</Text>
        <Text style={styles.SubWelcomeText}>Book appointments!</Text>
        <View>
          <CardView style={styles.BookAppointmentContainer} isShowAnimation={true} shadowRatio={10} onPress={() => {
            props.navigation.navigate('BookAppointmentScreen')
          }}>
            <LottieView
              source={BookAppointment}
              autoPlay={true}
              loop={true}
              style={{ height: '100%', width: '100%' }}
            />
            {/* <Image source={require('../screens/assets/appointment.jpg')} resizeMode={'contain'} style={{ flex: 1 }}/> */}
          </CardView>
          <View style={styles.HeaderContainer}>
            <Text style={styles.SubWelcomeText}>Check appointments!</Text>
          </View>
          <CardView isShowAnimation={true} style={styles.BookAppointmentContainer} shadowRatio={10} onPress={() => {
            props.navigation.navigate('CheckAppointmentScreen')
          }}>
            <LottieView
              source={CheckAppointment}
              autoPlay={true}
              loop={true}
              style={{ height: '100%', width: '100%' }}
            />
          </CardView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
