import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
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

import _ from 'lodash'

const avatar = {
  0: AVATAR1,
  1: AVATAR2,
  2: AVATAR3,
  3: AVATAR4,
  4: AVATAR5,
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
    borderWidth: StyleSheet.hairlineWidth,
    height: 120,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 12, height: 12 },
    shadowRadius: 10,
    elevation: 10,
    padding: 10,
    borderColor: '#2288DC',
    // backgroundColor: '#2288DC'
  } as ViewStyle,

  ListHeaderText: {
    fontSize: 14,
    color: '#0B0F19'
  } as TextStyle,

  ListHeaderName: {
    fontSize: 14,
    color: '#333a61'
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
    {
      appointerName: 'John',
      status: 200,
      id: 1
    }, {
      appointerName: 'John2',
      status: 200,
      id: 1
    }, {
      appointerName: 'John3',
      status: 200,
      id: 1
    },
    {
      appointerName: 'John4',
      status: 200,
      id: 1
    }, {
      appointerName: 'John5',
      status: 200,
      id: 1
    }, {
      appointerName: 'John6',
      status: 200,
      id: 1
    },
    {
      appointerName: 'John7',
      status: 200,
      id: 1
    }, {
      appointerName: 'John8',
      status: 200,
      id: 1
    }, {
      appointerName: 'John9',
      status: 200,
      id: 1
    }
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
    const ratio = 160 / 362
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
      <Animated.View style={[{ opacity, transform: [{ translateY }, { scale }] }]}>
        <LinearGradient colors={['#2193b0', '#6dd5ed']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ListWrapper}>
          <View>
            {/* <LottieView */}
            {/*  source={avatar[_.random(Object.keys(avatar).length - 1) || 0]} */}
            {/*  autoPlay={true} */}
            {/*  loop={true} */}
            {/*  style={{ height: 60, marginLeft: -6, }} */}
            {/* /> */}
            <SVG height={65} width={65}/>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={{ justifyContent: 'space-around' }}>
                <Text style={styles.ListHeaderName}>Name:</Text>
                <Text style={styles.ListHeaderName}>Status:</Text>
              </View>
              <View style={{ justifyContent: 'space-around' }}>
                <Text style={styles.ListHeaderText}>{item.appointerName}</Text>
                <Text style={styles.ListHeaderText}>{status}</Text>
              </View>

            </View>
            <TouchableOpacity
              onPress={() => { generateQRCode(item) }}
              style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderColor: '#2288DC', borderWidth: 1, height: 30, width: 100, alignSelf: 'flex-end', borderRadius: 8 }}
              onFocus={(e) => {
                console.log('e', e.bubbles); arrowRef.current.play() }}
              onBlur={() => {
                console.log('onblur'); arrowRef.current.reset() }}
            >
              <Text style={{ fontSize: 12 }}>Get QR code</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    )
  }

  const y = useRef(new Animated.Value(0)).current
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  })

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
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
      />

    </SafeAreaView>
  )
}
