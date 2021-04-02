import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import LottieView from 'lottie-react-native'
import loader from '../assets/loading.json'
import { Icon } from 'react-native-elements'
import { DrawerActions } from '@react-navigation/native'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white'
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

  SubWelcomeText: {
    fontSize: 20,
    color: '#9EABB5'
  } as TextStyle,

  QRCodeContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  QRImage: {
    height: 220,
    width: 220,
    opacity: 0
  } as ImageStyle,

  FooterText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#9EABB5'
  } as TextStyle

})

export const QRCode = (props) => {

  const qrImageUri = JSON.stringify(props.route.params)
  const [loading, setLoading] = useState(false)
  const qrImageRef = useRef<Image>(null)
  const lottieRef = useRef<LottieView>(null)

  useEffect(() => {
    if (!loading) {
      qrImageRef.current.setNativeProps({ style: { opacity: 1 } })
      lottieRef.current && lottieRef.current.reset()
    }
  }, [])

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ flexDirection: 'row', marginLeft: -15, alignItems: 'center', marginBottom: 60 }}>
        <Icon name={'menu'} type={'simple-line-icon'} size={25} style={{ marginTop: 0 }}
					  onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()) }}/>

        <View style={styles.HeaderContainer}>
          <Text style={styles.WelcomeText}>QR Code</Text>
        </View>
      </View>
      <View style={styles.QRCodeContainer}>
        {
          loading
            ? <LottieView
              ref={lottieRef}
              source={loader}
              loop={true}
              autoPlay={true}
            /> : null
        }
        <Image
          ref={qrImageRef}
          source={{
            uri: `https://api.qrserver.com/v1/create-qr-code/?data=${qrImageUri}&size=220x220`
          }}
          onLoadStart={() => { setLoading(true) }}
          onLoadEnd={() => { setLoading(false) }}
          style={styles.QRImage}
          progressiveRenderingEnabled={true}
        />
      </View>

      <Text style={styles.FooterText}>
				Show this QR code at the time of appointment.
      </Text>

    </SafeAreaView>
  )
}
