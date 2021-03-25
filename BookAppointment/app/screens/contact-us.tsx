import React from 'react'
import { Keyboard, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import contactMe from './assets/contact-me.json'
import AnimatedLottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { DrawerActions } from '@react-navigation/native'

const styles = StyleSheet.create({

  Wrapper: {
    flex: 1,
    padding: 25
  } as ViewStyle,

  HeaderContainer: {
    alignItems: 'center',
    width: '100%'
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19'
  } as TextStyle,

  TitleContainer: {
    justifyContent: 'space-evenly',
    marginRight: -10,
    marginLeft: 40,
    height: 150
  } as ViewStyle,

  Title: {
    fontSize: 18,
    fontWeight: '700'
  } as TextStyle,

  DisclaimerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5
  } as TextStyle,

  Value: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25
  } as TextStyle,

  Disclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 25
  } as TextStyle,

  DisclaimerContainer: {
    marginTop: 15,
    marginBottom: 35
  } as TextStyle,

  Lottie: {
    height: 300,
    alignSelf: 'center'
  } as ViewStyle,

  HeaderWrapper: {
    flexDirection: 'row',
    marginLeft: -15,
    alignItems: 'center',
    marginBottom: 30
  } as ViewStyle

})

export const ContactUs = (props) => {
  return (
    <SafeAreaView style={styles.Wrapper}>
      <View style={styles.HeaderWrapper}>
        <Icon
          name={'menu'}
          type={'simple-line-icon'}
          size={25}
          style={{ marginTop: 0 }}
          onPress={() => {
            Keyboard.dismiss()
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }}
        />

        <View style={styles.HeaderContainer}>
          <Text style={styles.WelcomeText}>Contact Me</Text>
        </View>
      </View>
      <View style={styles.DisclaimerContainer}>
        <Text style={styles.DisclaimerTitle}>Disclaimer</Text>
        <Text style={styles.Disclaimer}>
          {/* Ask for appointment to anyone by sending them */}
          {/* mail and once they accept the invitation, you will get a notification. */}
            Please do not enter any
            sensitive information. This app is not tested for any vulnerabilities, so please do not enter
            your real email password while signing in.
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.TitleContainer}>
          {/* <Text style={styles.Title}>Developer: </Text> */}
          {/* <Text style={styles.Title}>Email: </Text> */}
          {/* <Text style={styles.Title}>LinkedIn: </Text> */}
          <Icon name={'engineering'} type={'material'} />
          <Icon name={'email'} type={'zocial'}/>
          <Icon name={'linkedin'} type={'material-community'}/>
        </View>
        <View style={styles.TitleContainer}>
          <Text style={styles.Value}>Sourav Yadav</Text>
          <Text style={styles.Value}>yadavsourav24071998@gmail.com</Text>
          <Text style={styles.Value}>https://linkedin.com/in/souravyadav</Text>
        </View>
      </View>
      <AnimatedLottieView
        source={contactMe}
        autoPlay={true}
        style={styles.Lottie}
      />
    </SafeAreaView>
  )
}
