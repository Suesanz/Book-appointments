import React, { useRef, useState } from 'react'
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import axios, { AxiosResponse } from 'axios'
import validate from "validate.js"
import { RNDateTimePicker } from "../../components/date-time-picker/date-time-picker"
import Device from "../../utils/device"
import Modal from 'react-native-modal'
import LottieView from 'lottie-react-native'
import success from '../assets/success.json'
import success2 from '../assets/success-2.json'
import failed from '../assets/failed.json'
import failed2 from '../assets/failed-2.json'
import { DrawerActions } from "@react-navigation/native"
import { connect } from "react-redux"

interface PickerEvent {
  type:string
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
    fontWeight: 'normal',
    color: '#9EABB5',
    marginBottom: 40
  } as TextStyle,

  InputContainer: {
    flex: 0.4,
    justifyContent: 'center'
  } as ViewStyle,

  FooterContainer: {
    flex: 0.2,
    justifyContent: 'center',
  } as ViewStyle,

  AppointmentButton: {
    marginVertical: 10,
    justifyContent: 'center'
  } as ViewStyle,

  TimeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  } as ViewStyle,

  MR8: {
    marginRight: 8
  } as ViewStyle

})

const BookAppointmentInternal = (props) => {

  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date(Date.now()))
  const [mode, setMode] = useState<'time'|'date'|undefined>('date')

  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false)

  const [emailError, setEmailError] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [dateError, setDateError] = useState<string>('')

  const [isModalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({ message: '', success: false })

  const emailInputRef = useRef<Input>(null)
  const nameInputRef = useRef<Input>(null)

  const constraints = {
    email: {
      presence: {
        message: '^Please enter an email address'
      },
      email: {
        message: '^Please enter a valid email address'
      }
    },

    username: {
      presence: true,
      format: {
        pattern: /^[A-Za-z ]+$/,
        message: function (value:String) {
          return validate.format('^Please enter a valid name', {
            num: value
          })
        }
      }
    },

  }

  const onEmailChangeText = (value: string) => {
    setEmailValue(value)
  }

  const onNameChangeText = (value: string) => {
    setNameValue(value)
  }

  const resetDateAndTime = () => {
    setDateError('')
    setTime('')
    setDate(new Date(Date.now()))
  }

  const pickerHandler = (event:PickerEvent|Event, selectedDate:Date|undefined) => {

    let updateTime = true

    // For Android
    if (Platform.OS === 'android') {

      if (("type" in event && event.type === 'dismissed')) {

        setPickerVisible(false)
        updateTime = false

      } else if ("type" in event && event.type === 'set') {

        setPickerVisible(false)

      }
    }

    if (updateTime) {
      const currentDate = selectedDate || date
      setDate(currentDate)

      const newTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      const newDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

      setTime(newTime + ',  ' + newDate)
    }

  }

  const bookAppointmentHandler = async () => {
    setLoading(true)

    nameInputRef.current && nameInputRef.current.blur()
    emailInputRef.current && emailInputRef.current.blur()

    const error = validate({
      username: nameValue,
      email: emailValue,
    }, constraints)

    const isDate = time && validate.isString(time)

    error?.username && setNameError(error.username[0])
    error?.email && setEmailError(error.email[0])
    !isDate && setDateError('Please select a valid date')

    if (!error?.username && !error?.email && isDate) {

      try {
        const url = `http://localhost:5001/book-appointments-37a0e/us-central1/sendMail?destEmail=${emailValue}&destName=${nameValue}&senderName=${props.username}&senderEmail=${props.email}&time=${time}`
        console.log('url', url)
        const response:AxiosResponse = await axios.get(url)

        console.log(response.status)
        console.log(response.data)
        console.log(response.statusText)
        setModalContent({ message: 'Appointment request sent successfully. Go to check appointment screen to view status of your appointment.', success: true })
      } catch (error) {
        setModalContent({ message: 'Appointment request failed. Please try again or contact support.', success: false })
        console.log('Error in sending request', error.message)
      }

      setModalVisible(true)
    }

    setLoading(false)

  }

  return (
    <SafeAreaView style={styles.Container}>

      <RNDateTimePicker
        isVisible={isPickerVisible}
        onSelect={() => setPickerVisible(false) }
        mode={mode}
        pickerValue={date}
        reset={resetDateAndTime}
        onChange={pickerHandler}
      />

      <View style={{ flexDirection: 'row', marginLeft: -15, alignItems: 'center', marginBottom: 40 }}>
        <Icon name={'menu'} type={'simple-line-icon'} size={25} style={{ marginTop: 0 }}
          onPress={() => {
            Keyboard.dismiss()
            props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        />

        <View style={styles.HeaderContainer}>
          <Text style={styles.WelcomeText}>Book Appointment</Text>
        </View>
      </View>
      <Text style={styles.SubWelcomeText}>Please enter the details of the appointer!</Text>
      <View style={styles.InputContainer}>
        <Input
          ref={nameInputRef}
          placeholder={'Full name'}
          value={nameValue}
          leftIcon={<Icon name={'face'} />}
          leftIconContainerStyle={styles.MR8}
          onChangeText={onNameChangeText}
          errorMessage={nameError}
          onFocus={() => setNameError('')}
          autoCorrect={false}
          autoFocus
        />
        <Input
          ref={emailInputRef}
          placeholder={'Email Id'}
          value={emailValue}
          leftIcon={<Icon name={'email'} />}
          leftIconContainerStyle={styles.MR8}
          onChangeText={onEmailChangeText}
          errorMessage={emailError}
          onFocus={() => { setEmailError('') }}
          autoCorrect={false}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { setMode("time"); setPickerVisible(true) }}
        >
          <Input
            pointerEvents={'none'}
            ref={emailInputRef}
            placeholder={'Date'}
            value={time}
            leftIcon={<Icon name={'date-range'} />}
            leftIconContainerStyle={styles.MR8}
            onChangeText={onEmailChangeText}
            errorMessage={dateError}
            editable={false}
            onFocus={() => { setDateError('') }}
            rightIcon={<Icon name={'restore'} onPress={resetDateAndTime}/>}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.TimeContainer}>

        <Button
          title={'Select time'}
          titleStyle={{ fontSize: 16 }}
          onPress={() => { setMode("time"); setPickerVisible(true) }}
        />
        <Button
          title={'Select date'}
          titleStyle={{ fontSize: 16 }}
          onPress={() => { setMode("date"); setPickerVisible(true) }}
        />

      </View>

      <View style={styles.FooterContainer}>
        <Button
          title={'Book appointment'}
          titleStyle={{ fontSize: 16 }}
          containerStyle={styles.AppointmentButton}
          onPress={bookAppointmentHandler}
          loading={isLoading}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
        onDismiss={() => { setModalVisible(false) }}
        onSwipeComplete={() => { setModalVisible(false) }}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={75}
        animationOutTiming={75}
        backdropTransitionOutTiming={0}
      >
        <View style={{ height: 400, alignItems: 'center', padding: 20, borderRadius: 25, backgroundColor: '#F6F5F5' }}>
          <Text style={{ fontSize: 18, lineHeight: 30, color: '#000000', height: modalContent.success ? 150 : 110, marginHorizontal: 10 }}>{modalContent.message}</Text>
          <LottieView
            source={modalContent.success ? success2 : failed2}
            autoPlay={true}
            loop={false}
            style={{ height: modalContent.success ? 120 : 185, alignSelf: 'center', marginBottom: modalContent.success ? 20 : 0 }}
          />
          <Button
            title={'Okay'}
            buttonStyle={{ backgroundColor: modalContent.success ? '#38ac7f' : '#e3342f', width: 200 }}
            titleStyle={{ textAlign: 'center' }}
            containerStyle={{ marginTop: 20 }}
            style={{ alignItems: 'center', }}
            onPress={() => { setModalVisible(false) }}
          />
        </View>
        {/* </ImageBackground> */}
      </Modal>

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  username: state.auth.username,
  userId: state.auth.userId,
})

export const BookAppointment = connect(mapStateToProps, null)(BookAppointmentInternal)
