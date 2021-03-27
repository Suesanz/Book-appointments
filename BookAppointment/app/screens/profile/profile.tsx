import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator, Easing,
  Image, ImageStyle,
  Keyboard, Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker'
import { DrawerActions } from '@react-navigation/native'
import * as profileActions from '../../store/actions/profile-actions'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import storage from '@react-native-firebase/storage'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white'
  } as ViewStyle,

  HeaderContainer: {
    flexDirection: 'row',
    marginLeft: -15,
    alignItems: 'center',
    marginBottom: 40
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19',
    textAlign: 'center',
    flex: 1
  } as TextStyle,

  ProfileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    width: 100,
    marginBottom: 10,
    alignSelf: 'center'
  } as ViewStyle,

  EditIconContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end'
  } as ViewStyle,

  InputContainer: {
    justifyContent: 'center',
  } as ViewStyle,

  GenderError: {
    fontSize: 12,
    marginTop: -9,
    marginLeft: 15,
    color: 'red'
  } as TextStyle,

  UpdateProfileError: {
    fontSize: 14,
    textAlign: 'center',
    height: 30,
  } as TextStyle,

  RadioButtonStyle: {
    marginLeft: 12,
    marginVertical: 12
  } as ViewStyle,

  GenderLabel: {
    fontSize: 18,
    color: '#0B0F19',
    marginLeft: 8,
    marginTop: 10
  } as TextStyle,

  ProfileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  } as ImageStyle

})

interface ProfileProps {
  username: string
  email: string
  gender: string
  address: string
  setLoading: (arg0: boolean) => void
  fetchProfile: () => void
  updateProfile: (emailValue: string, gender: string, addressValue: string) => void
  setError: (arg0: string) => void
  setAddress: (arg0: string) => void
  setGender: (arg0: string) => void
  isLoading: boolean
  message: { msg: string, success: boolean }
  navigation
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' }
]

const ProfileInternal = (props: ProfileProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false)

  const [addressError, setAddressError] = useState<string>('')
  const [genderError, setGenderError] = useState<string>('')
  const [uri, setUri] = useState(null)
  const addressRef = useRef<Input>(null)
  const circularProgressRef = useRef<AnimatedCircularProgress>(null)

  const onAddressChangeText = (value: string) => { props.setAddress(value) }

  useEffect(() => {
    (async () => {
      setIsImageLoading(true)
      await props.fetchProfile()
      try {
        const url = await storage().ref(`${props.email}-profile-image.png`).getDownloadURL()
        setUri(url)
      } catch (e) {
        props.setError('Failed to update profile. Please try again.')
      }
      setIsImageLoading(false)
    })()

    return () => { props.setError('') }

  }, [])

  const onSave = async () => {
    const isAddressError = props.address?.length < 10
    const isGenderError = !['male', 'female', 'others'].includes(props.gender)

    addressRef.current.blur()
    props.setError('')

    if (isAddressError || isGenderError) {
      if (isAddressError) setAddressError('Invalid address')
      if (isGenderError) setGenderError('Please select gender')
    } else {
      props.setLoading(true)
      if (uri) {
        const reference = storage().ref(`${props.email}-profile-image.png`)
        const pathToFile = `${uri}`
        try {
          await reference.putFile(pathToFile)
        } catch (e) {
          props.setError('Image not supported!')
        }
      }
      await props.updateProfile(props.email, props.gender, props.address)

      props.setLoading(false)
    }
  }

  const imageUploadHandler = () => {
    setIsImageLoading(true)
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.uri) {
        setUri(response.uri)
      }
      setIsImageLoading(false)
    })
  }

  return (
    <SafeAreaView style={styles.Container}>

      <View style={styles.HeaderContainer}>
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
        <Text style={styles.WelcomeText}>Profile</Text>
      </View>

      <TouchableOpacity activeOpacity={0.6} style={styles.ProfileImageContainer} onPress={imageUploadHandler}>
        {isImageLoading
          ? <ActivityIndicator size={'small'} color={'grey'}/>
          : (uri
            ? <AnimatedCircularProgress
              ref={circularProgressRef}
              size={100}
              width={5}
              fill={0}
              prefill={0}
              tintColor="#2189DC"
              backgroundColor="#FFFFFF"
            >
              {() => <Image
                source={{ uri }}
                resizeMode={'cover'}
                style={styles.ProfileImage}
                defaultSource={require('../assets/image-placeholder.png')}
                onProgress={({ nativeEvent: { loaded, total } }) => { circularProgressRef.current.animate(100 / total * loaded, 500) }}
              />}
            </AnimatedCircularProgress>

            : <>
              <Icon name={'account-circle'} size={100} color={'#9EABB5'}/>
              <Icon name={'edit'} containerStyle={styles.EditIconContainer}/>
            </>
          )
        }
      </TouchableOpacity>

      <View style={styles.InputContainer}>
        <Input
          placeholder={'Full name'}
          value={props.username}
          leftIcon={<Icon name={'face'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          autoFocus
          autoCorrect={false}
          disabled={true}
        />
        <Input
          placeholder={'Email Id'}
          value={props.email}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          autoCorrect={false}
          disabled={true}
        />
        <Input
          ref={addressRef}
          placeholder={'Address'}
          value={props.address}
          leftIcon={<Icon name={'home'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onAddressChangeText}
          errorMessage={addressError}
          onFocus={() => {
            setAddressError('')
          }}
          autoCorrect={false}
        />
        <Text style={styles.GenderLabel}>Gender</Text>
        <RadioForm
          formHorizontal={true}
          animation={true}
        >
          {genderOptions.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={props.gender === obj.value}
                onPress={(value) => {
                  setGenderError('')
                  props.setGender(value)
                }}
                borderWidth={1}
                buttonInnerColor={'#2196f3'}
                buttonOuterColor={props.gender === obj.value ? '#2196f3' : '#000'}
                buttonSize={15}
                buttonOuterSize={20}
                buttonWrapStyle={styles.RadioButtonStyle}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={(value) => {
                  setGenderError('')
                  props.setGender(value)
                }}
                labelStyle={{ fontSize: 18 }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))
          }
        </RadioForm>
        <Text style={styles.GenderError}>{genderError}</Text>
      </View>

      <Text style={[styles.UpdateProfileError, { color: props.message?.success ? 'green' : 'red' }]}>{props.message?.msg}</Text>

      <Button
        title={'Save'}
        onPress={onSave}
        loading={props.isLoading}
        disabled={props.isLoading}
      />

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,

  message: state.profile.message,
  isLoading: state.profile.isLoading,
  gender: state.profile.gender,
  address: state.profile.address,
})

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (emailValue: string, gender: string, address: string) => dispatch(profileActions.updateProfile(emailValue, gender, address)),
  fetchProfile: () => dispatch(profileActions.fetchProfile()),
  setError: (error: string) => dispatch(profileActions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(profileActions.setLoading(isLoading)),
  setAddress: (address: string) => dispatch(profileActions.setAddress(address)),
  setGender: (gender: string) => dispatch(profileActions.setGender(gender)),
})

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileInternal)
