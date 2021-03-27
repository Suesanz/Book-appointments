import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import CheckAppointment from '../assets/check-appointment-2.json'
import BookAppointment from '../assets/book-appointment-2.json'
import { CardView } from "../../components/animated-view/animated-view"
import { fonts } from "../../theme/font"
import LinearGradient from 'react-native-linear-gradient'
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
    fontSize: 22,
    fontFamily: fonts.semibold,
    color: '#F2994A',
  } as TextStyle,

  BookAppointmentContainer: {
    // flex: 1,
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
    backgroundColor: '#71B280'
  } as ViewStyle

})

export const Home = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  return (
    <ImageBackground source={require('../assets/home.jpg')} style={{ flex: 1, opacity: 1 }} resizeMode={'cover'}>
      <SafeAreaView style={styles.Container}>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.WelcomeText}>Welcome</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <View style={styles.HeaderContainer}>
            <Text style={styles.SubWelcomeText}>Book appointments</Text>
          </View>
          <CardView style={[styles.BookAppointmentContainer, { backgroundColor: '#F2994A' }]} isShowAnimation={true} shadowRatio={10} onPress={() => {
            props.navigation.navigate('BookAppointmentScreen')
          }}>
            <LinearGradient colors={['#F2994A', '#F2C94C', '#F2994A']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 500 }}>
              <LottieView
                source={BookAppointment}
                autoPlay={true}
                loop={true}
                style={{ flex: 1 }}
              />
            </LinearGradient>
          </CardView>
          <View style={styles.HeaderContainer}>
            <Text style={[styles.SubWelcomeText, { color: '#134E5E' }]}>Check appointments</Text>
          </View>
          <CardView isShowAnimation={true} style={[styles.BookAppointmentContainer]} shadowRatio={10} onPress={() => {
            props.navigation.navigate('CheckAppointmentScreen')
          }}>
            <LinearGradient colors={['#134E5E', '#71B280', '#134E5E']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 500 }}>
              <LottieView
                source={CheckAppointment}
                autoPlay={true}
                loop={true}
                style={{ height: 260 }}
              />
            </LinearGradient>
          </CardView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
