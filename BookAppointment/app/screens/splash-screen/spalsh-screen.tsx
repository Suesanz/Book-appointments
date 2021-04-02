import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import book from '../assets/splash-screen.json'
import AnimatedLottieView from 'lottie-react-native'

const styles = StyleSheet.create({

  Wrapper: {
    flex: 1
  } as ViewStyle,

  TitleContainer: {
    flex: 0.3,
    justifyContent: 'flex-end'
  } as ViewStyle,

  Title: {
    fontSize: 38,
    fontWeight: '700',
    textAlign: 'center'
  } as TextStyle,

  Lottie: {
    flex: 0.6
  } as ViewStyle

})

export const SplashScreen = (props) => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>Book Appointment</Text>
      </View>
      <AnimatedLottieView
        loop={false}
        // @ts-ignore
        source={book}
        autoPlay={true}
        onAnimationFinish={() => {
          props.setOnAnimationFinished()
        }}
        style={styles.Lottie}
      />
    </View>
  )
}
