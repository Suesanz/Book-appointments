import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StatusPreset from '../../presets/status-preset'
import LottieView from 'lottie-react-native'
import Empty from '../assets/empty.json'
import { DrawerActions } from '@react-navigation/native'

import _ from 'lodash'
import { fonts } from '../../theme/font'
import { CardView } from '../../components/animated-view/animated-view'
import { Icon } from 'react-native-elements'
import loader from '../assets/loading.json'
import { connect } from 'react-redux'
import axios, { AxiosResponse } from 'axios'

const cards = {
  0: require('../assets/card1.png'),
  1: require('../assets/card2.png'),
  2: require('../assets/card3.png'),
  3: require('../assets/card4.png')
}

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
    height: 150,
    borderRadius: 10,
    overflow: 'hidden'
  } as ViewStyle,

  ListHeaderText: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#ffffff'
  } as TextStyle,

  ListHeaderName: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: '#ffffff'
  } as TextStyle,

  ItemSeparator: {
    marginVertical: 10
  } as ViewStyle

})

const renderItemSeparator = () => (<View style={styles.ItemSeparator}/>)

export const CheckAppointmentInternal = (props) => {

  const [isLoading, setLoading] = useState(true)
  const [isRefreshing, setRefreshing] = useState(false)
  const [list, setList] = useState<{ status: number; appointerName: string, appointmentTime: string }[]>([
    {
      appointerName: 'Jim Helpert',
      appointmentTime: '4:00 PM, April 1, 2021',
      status: 200,
    }, {
      appointerName: 'Pam Beasely',
      appointmentTime: '5:00 PM, April 2, 2021',
      status: 200,
    }, {
      appointerName: 'Dwight Shrute',
      appointmentTime: '6:00 PM, April 3, 2021',
      status: 300,
    },
    {
      appointerName: 'Karen',
      appointmentTime: '7:00 PM, April 4, 2021',
      status: 404,
    }, {
      appointerName: 'Phylis',
      appointmentTime: '2:00 PM, April 5, 2021',
      status: 404,
    }, {
      appointerName: 'Stanley',
      appointmentTime: '1:00 PM, April 6, 2021',
      status: 300,
    },
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

  const getList = async () => {
    try {
      const url = `http://localhost:5001/book-appointments-37a0e/us-central1/getAppointments?appointeeEmail=${props.email}`
      const response: AxiosResponse = await axios.get(url)
      setList([...list, ...response.data])
    } catch (error) {
      console.log('Error in sending request. Message: ', error.message)
      console.log('Error in sending request. Data: ', error.data)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getList()
    setRefreshing(false)
  }

  useEffect(() => {
    (async () => {
      !isLoading && setLoading(true)
      await getList()
      setLoading(false)

    })()
  }, [])

  const generateQRCode = (item) => {
    props.navigation.navigate('QRCodeScreen', { ...item })
  }

  const Card = ({ index, item, y }: { index: number, item, y: Animated.Value }) => {
    const { width } = Dimensions.get('window')
    const ratio = 200 / 362
    const CARD_WIDTH = width * 0.8
    const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio
    const MARGIN = 10
    const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2

    const inputRange = [
      -1,
      0,
      CARD_HEIGHT * index,
      CARD_HEIGHT * (index + 2)
    ]

    const opacityInputRange = [
      -1,
      0,
      CARD_HEIGHT * index,
      CARD_HEIGHT * (index + 1)
    ]

    const scale = y.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    })

    const opacity = y.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    })

    const status = StatusPreset[item.status]
    const isActive = Number(item.status) === 200
    return (
      <CardView
        style={{ flex: 1, borderRadius: 15, height: 150, marginTop: 10 }}
        onPress={() => { isActive && generateQRCode(item) }}
        isShowAnimation={true}
        shadowRatio={0}
      >
        <Animated.View style={[{ opacity, transform: [{ scale }] }, styles.ListWrapper]}>
          <ImageBackground
            source={Image.resolveAssetSource(cards[_.random(Object.keys(cards).length - 1) || 0])}
            style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1, padding: 15 }}>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'space-around' }}>
                  <Text style={styles.ListHeaderName}>Appointer: </Text>
                  <Text style={styles.ListHeaderName}>Time: </Text>
                  <Text style={styles.ListHeaderName}>Status: </Text>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                  <Text style={styles.ListHeaderText}>{item.appointerName}</Text>
                  <Text style={styles.ListHeaderText}>{item.appointmentTime}</Text>
                  <Text style={styles.ListHeaderText}>{status}</Text>
                </View>

              </View>
              {isActive && <Text style={{ fontSize: 12, color: '#ffffff', alignSelf: 'flex-end' }}>Get QR code</Text>}
            </View>
          </ImageBackground>
        </Animated.View>
      </CardView>
    )
  }

  const y = useRef(new Animated.Value(0)).current
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true
  })

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  const renderEmptyItem = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView source={Empty} autoPlay={true} loop={true} style={{ height: 400 }}/>
        <Text style={{ fontFamily: fonts.italic, fontSize: 22 }}>No appointment to show!</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.Container} edges={['top', 'bottom']}>
      <View style={{ flexDirection: 'row', marginLeft: -15, alignItems: 'center', marginBottom: 60 }}>
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
          <Text style={styles.WelcomeText}>Check Appointment</Text>
        </View>
      </View>

      {!isLoading
        ? <AnimatedFlatList
          data={list}
          scrollEventThrottle={16}
          onScroll={onScroll}
          keyExtractor={(item, index) => item.appointerName + index}
          renderItem={({ index, item }) => (<Card index={index} item={item} y={y}/>)}
          ItemSeparatorComponent={renderItemSeparator}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyItem}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
        : <LottieView
          source={loader}
          loop={true}
          autoPlay={true}
        />
      }
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  email: state.auth.email
})

export const CheckAppointment = connect(mapStateToProps, null)(CheckAppointmentInternal)
