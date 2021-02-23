import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList, Image, ImageBackground,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios, { AxiosResponse } from 'axios'
import StatusPreset from '../presets/status-preset'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
// import avatar0 from './assets/avatar/1.json'
import AVATAR1 from './assets/avatar/avatar-1.svg'
import AVATAR2 from './assets/avatar/avatar-2.svg'
import AVATAR3 from './assets/avatar/avatar-3.svg'
import AVATAR4 from './assets/avatar/avatar-4.svg'
import AVATAR5 from './assets/avatar/avatar-5.svg'
import Empty from './assets/empty.json'

import _ from 'lodash'
import { fonts } from "../theme/font"
import { CardView } from "../components/card-view-animated"

const avatar = {
  0: AVATAR1,
  1: AVATAR2,
  2: AVATAR3,
  3: AVATAR4,
  4: AVATAR5,
}

const cards = {
  0: require('./assets/card1.png'),
  1: require('./assets/card2.png'),
  2: require('./assets/card3.png'),
  3: require('./assets/card4.png'),
}

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white'
  } as ViewStyle,

  HeaderContainer: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-start'
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

  ListHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  } as ViewStyle,

  ListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: StyleSheet.hairlineWidth,
    height: 150,
    borderRadius: 10,
    // marginTop: 10,
    overflow: 'hidden',
    // padding: 10,
    // borderColor: '#2288DC',
    // backgroundColor: '#2288DC'
  } as ViewStyle,

  ListHeaderText: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#ffffff'
  } as TextStyle,

  ListHeaderName: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: '#ffffff'
  } as TextStyle,

  ItemSeparator: {
    marginVertical: 10
  } as ViewStyle

})

// const renderHeader = () => {
//   return (
//     <View style={styles.ListHeaderContainer}>
//       <Text style={styles.ListHeaderText}>Name</Text>
//       <Text style={styles.ListHeaderText}>Status</Text>
//       <Text style={styles.ListHeaderText}>Operation</Text>
//     </View>
//   )
// }

const renderItemSeparator = () => {
  return (
    <View style={styles.ItemSeparator}/>
  )
}

export const CheckAppointment = (props) => {

  const [list, setList] = useState([
    // {
    //   appointerName: 'John',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John2',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John3',
    //   status: 200,
    //   id: 1
    // },
    // {
    //   appointerName: 'John4',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John5',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John6',
    //   status: 200,
    //   id: 1
    // },
    // {
    //   appointerName: 'John7',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John8',
    //   status: 200,
    //   id: 1
    // }, {
    //   appointerName: 'John9',
    //   status: 200,
    //   id: 1
    // }
  ])

  const arrowRef = useRef<LottieView>(null)

  useEffect(() => {
    (async () => {
      try {
        // const url = `http://localhost:5001/book-appointments-37a0e/us-central1/getAppointments`
        // const response: AxiosResponse = await axios.get(url)
        // setList(response.data)
      } catch (error) {
        console.log('Error in sending request', error.message)
      }
    })()
  }, [])

  const generateQRCode = (item) => {
    props.navigation.navigate('QRCodeScreen', { ...item })
  }

  const Card = ({ index, item, y }: { index: number, item: { status: number; appointerName: string, y: Animated.Value } }) => {
    const { width, height: wHeight } = Dimensions.get("window")
    const ratio = 200 / 362
    const CARD_WIDTH = width * 0.8
    const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio
    const MARGIN = 10
    const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2
    const height = wHeight - 64
    const position = Animated.subtract(index * CARD_HEIGHT, y)
    const isDisappearing = -CARD_HEIGHT
    const isTop = 0
    const isBottom = height - CARD_HEIGHT
    const isAppearing = height
    const animatedIndex = useRef(new Animated.Value(0)).current

    const translateY = Animated.add(
      Animated.add(
        y,
        y.interpolate({
          inputRange: [0, 0.00001 + index * CARD_HEIGHT],
          outputRange: [0, -index * CARD_HEIGHT],
          extrapolateRight: "clamp",
        })
      ),
      position.interpolate({
        inputRange: [isBottom, isAppearing],
        outputRange: [0, -CARD_HEIGHT / 4],
        extrapolate: "clamp",
      })
    )
    const scale = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
      extrapolate: "clamp",
    })
    const opacity = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
    })

    const status = StatusPreset[item.status]
    const SVG = avatar[_.random(Object.keys(avatar).length - 1) || 0]
    return (
      <CardView style={{ flex: 1, borderRadius: 15, height: 150, marginTop: 10 }} onPress={() => { generateQRCode(item) }} isShowAnimation={true} shadowRatio={0}>
        <Animated.View style={[{ opacity, transform: [{ translateY }, { scale }] }, styles.ListWrapper]}>
          <ImageBackground source={Image.resolveAssetSource(cards[_.random(Object.keys(cards).length - 1) || 0])} style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1, padding: 15 }}>

              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={{ justifyContent: 'space-around' }}>
                  <Text style={styles.ListHeaderName}>Name: </Text>
                  <Text style={styles.ListHeaderName}>Status: </Text>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                  <Text style={styles.ListHeaderText}>{item.appointerName}</Text>
                  <Text style={styles.ListHeaderText}>{status}</Text>
                </View>

              </View>
              {/* <TouchableOpacity */}
              {/*  onPress={() => { generateQRCode(item) }} */}
              {/*  style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderColor: '#2288DC', borderWidth: 1, height: 30, width: 100, alignSelf: 'flex-end', borderRadius: 8 }} */}
              {/* > */}
              <Text style={{ fontSize: 12, color: '#ffffff' }}>Get QR code</Text>
              {/* </TouchableOpacity> */}
            </View>
          </ImageBackground>
        </Animated.View>
      </CardView>
    )
  }

  const y = useRef(new Animated.Value(0)).current
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  })

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  const renderEmptyItem = () => {
    return (
      <View style={{ height: 150, alignItems: 'center' }}>
        <LottieView source={Empty} autoPlay={true} loop={true} style={{ height: 300 }}/>
        <Text style={{ fontFamily: fonts.italic, fontSize: 22 }}>No appointment to show!</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.Container}>

      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Book Appointment,</Text>
        <Text style={styles.SubWelcomeText}>Check all your appointments!</Text>
      </View>

      <AnimatedFlatList
        data={list}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={onScroll}
        keyExtractor={(item) => item.appointerName}
        renderItem={({ index, item }) => (<Card index={index} item={item} y={y}/>)}
        // ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderItemSeparator}
        style={{ flex: 0.8 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyItem}
      />

    </SafeAreaView>
  )
}
