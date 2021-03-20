import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker'
import { DrawerActions } from '@react-navigation/native'
import * as actions from '../store/actions/profile-actions'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white'
  } as ViewStyle,

  HeaderContainer: {
    alignItems: 'center',
    backgroundColor: 'red'
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19',
    textAlign: 'center',
    flex: 1
  } as TextStyle,

  ProfileImageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  EditIconContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end'
  } as ViewStyle,

  InputContainer: {
    flex: 0.6,
    justifyContent: 'center'
  } as ViewStyle,

  genderError: {
    fontSize: 12,
    marginTop: -9,
    marginLeft: 15,
    color: 'red'
  } as TextStyle,

  UpdateProfileError: {
    fontSize: 14,
    textAlign: 'center',
    height: 30,
  } as TextStyle

})

interface ProfileProps {
  userName: string
  email: string
  gender: string
  address: string
  imageUri: string
  setLoading: (arg0: boolean) => void
  fetchProfile: () => void
  updateProfile: (emailValue: string, gender: string, addressValue: string, uri: string) => void
  setError: (arg0: string) => void
  setAddress: (arg0: string) => void
  setGender: (arg0: string) => void
  setImageUri: (arg0: string) => void
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

  const addressRef = useRef<Input>(null)

  const onAddressChangeText = (value: string) => { props.setAddress(value) }

  console.log('props', props.address, props.gender)

  useEffect(() => {
    (async () => {
      await props.fetchProfile()
    })()
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
      await props.updateProfile(props.email, props.gender, props.address, props.imageUri)
      props.setLoading(false)
    }
  }

  const imageUploadHandler = () => {
    setIsImageLoading(true)
    launchImageLibrary({ mediaType: 'photo' }, media => {
      if (media.uri) {
        props.setImageUri(media.uri)
      }
      setIsImageLoading(false)
    })
  }

  return (
    <SafeAreaView style={styles.Container}>

      <View style={{ flexDirection: 'row', marginLeft: -15, alignItems: 'center', marginBottom: 60 }}>
        <Icon
          name={'menu'}
          type={'simple-line-icon'}
          size={25}
          style={{ marginTop: 0 }}
          onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        />
        <Text style={styles.WelcomeText}>Profile</Text>
      </View>

      <View style={styles.ProfileImageContainer}>
        <TouchableOpacity activeOpacity={0.6} style={{ borderRadius: 50 }} onPress={imageUploadHandler}>
          {isImageLoading
            ? <ActivityIndicator size={'small'}/>
            : (props.imageUri
              ? <Image
                source={{ uri: props.imageUri }}
                resizeMode={'stretch'}
                style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: 'red' }}
              />
              : <>
                <Icon name={'account-circle'} size={100} color={'#9EABB5'}/>
                <Icon name={'edit'} containerStyle={styles.EditIconContainer}/>
              </>
            )
          }

        </TouchableOpacity>
      </View>
      <View style={styles.InputContainer}>
        <Input
          placeholder={'Full name'}
          value={props.userName}
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
        <Text style={{ fontSize: 18, color: '#0B0F19', marginLeft: 8, marginTop: 10 }}>Gender</Text>
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
                buttonWrapStyle={{ marginLeft: 12, marginVertical: 12 }}
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
        <Text style={styles.genderError}>{genderError}</Text>
      </View>

      <Text style={[styles.UpdateProfileError, { color: props.message?.success ? 'green' : 'red' }]}>{props.message?.msg}</Text>

      <Button
        title={'Save'}
        onPress={onSave}
        loading={props.isLoading}
      />

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  userName: state.auth.username,
  email: state.auth.email,

  message: state.profile.message,
  isLoading: state.profile.isLoading,
  profileImageUri: state.profile.profileImageUri,
  gender: state.profile.gender,
  address: state.profile.address,
  imageUri: state.profile.imageUri,
})

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (emailValue: string, gender: string, address: string, uri: string) => dispatch(actions.updateProfile(emailValue, gender, address, uri)),
  fetchProfile: () => dispatch(actions.fetchProfile()),
  setError: (error: string) => dispatch(actions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(actions.setLoading(isLoading)),
  setAddress: (address: string) => dispatch(actions.setAddress(address)),
  setGender: (gender: string) => dispatch(actions.setGender(gender)),
  setImageUri: (uri: string) => dispatch(actions.setImageUri(uri)),
})

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileInternal)
