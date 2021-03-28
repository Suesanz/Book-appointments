import React, { useRef } from 'react'
import WebView from 'react-native-webview'
import { Icon } from 'react-native-elements'
import { ActivityIndicator, StatusBar, StyleSheet, View, ViewStyle } from 'react-native'
import Device from '../../utils/device'

const styles = StyleSheet.create({

  BackIconContainer: {
    backgroundColor: '#25292D', paddingTop: Device.insetTop
  } as ViewStyle,

  BackIcon: {
    alignSelf: 'flex-start',
    margin: 5
  } as ViewStyle,

  WebViewContainer: {
    display: 'none',
    flex: 1
  } as ViewStyle

})

export const RNWebView = (props) => {
  const loaderRef = useRef<ActivityIndicator>(null)
  const webViewContainerRef = useRef<View>(null)

  const onLoadEnd = () => {
    loaderRef.current.setNativeProps({ animating: false })
    webViewContainerRef.current.setNativeProps({ display: 'flex' })
  }

  const onLoadStart = () => {
    webViewContainerRef.current.setNativeProps({ display: 'none' })
    loaderRef.current.setNativeProps({ animating: true })
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} translucent={true} animated={true}/>
      <ActivityIndicator ref={loaderRef} size={'large'} color={'grey'} style={{ ...StyleSheet.absoluteFillObject }}/>
      <View style={styles.BackIconContainer}>
        <Icon onPress={() => { props.navigation.goBack() }} name={'arrow-back'} style={styles.BackIcon} color={'#FFFFFF'}/>
      </View>
      <View ref={webViewContainerRef} style={styles.WebViewContainer}>
        <WebView
          source={{ uri: props.route.params.uri }}
          style={{ flex: 1 }}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
        />
      </View>
    </>
  )
}
