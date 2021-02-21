import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import CheckAppointment from '../screens/assets/book-appointment.json'
import BookAppointment from '../screens/assets/check-appointment.json'

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
    marginBottom: 25
  } as TextStyle,

  SubWelcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#9EABB5'
  } as TextStyle,

  BookAppointmentContainer: {
    height: 150,
    borderWidth: 1,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: '#2288DC',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 12, height: 12 },
    shadowRadius: 10,
    elevation: 10,
  } as ViewStyle

})

export const Home = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  return (
    <SafeAreaView style={styles.Container} >
      {/* <View style={styles.HeaderContainer}> */}
      <Text style={styles.WelcomeText}>Welcome,</Text>
      {/* </View> */}
      <Text style={styles.SubWelcomeText}>Book appointments!</Text>
      <View>
        <TouchableOpacity activeOpacity={0.6} style={styles.BookAppointmentContainer} onPress={() => props.navigation.navigate('BookAppointmentScreen')}>
          {/* <Text> */}
          {/* Book an appointment */}
          {/* </Text> */}
          <LottieView
            source={BookAppointment}
            autoPlay={true}
            loop={true}
          />
          {/* <Image source={require('../screens/assets/appointment.jpg')} resizeMode={'contain'} style={{ flex: 1 }}/> */}
        </TouchableOpacity>
        <View style={styles.HeaderContainer}>
          <Text style={styles.SubWelcomeText}>Check appointments!</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} style={styles.BookAppointmentContainer} onPress={() => props.navigation.navigate('CheckAppointmentScreen')}>
          {/*  <Text> */}
          {/* Check your appointments */}
          {/*  </Text> */}
          <LottieView
            source={CheckAppointment}
            autoPlay={true}
            loop={true}
            // style={{ height: 60, marginLeft: -6, }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
