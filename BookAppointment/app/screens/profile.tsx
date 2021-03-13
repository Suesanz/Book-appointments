import React, { useRef, useState } from 'react'
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { connect } from "react-redux"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker'
import { DrawerActions } from '@react-navigation/native'
import * as actions from '../store/actions'

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
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  EditIconContainer: {
    position: "absolute",
    zIndex: 10,
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end'
  } as ViewStyle,

  InputContainer: {
    flex: 0.4,
    justifyContent: 'center'
  } as ViewStyle,

})

const ProfileInternal = (props) => {
  const [uri, setUri] = useState<string>(null)
  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [addressValue, setAddressValue] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [addressError, setAddressError] = useState<string>('')

  const onNameChangeText = (value: string) => { setNameValue(value) }
  const onEmailChangeText = (value: string) => { setEmailValue(value) }
  const onAddressChangeText = (value: string) => { setAddressValue(value) }

  const imageUploadHandler = async () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.uri) {
        setUri(response.uri)
      } else {
        setUri(null)
      }
    })
  }

  return (
    <SafeAreaView style={styles.Container}>

      <View style={{ flexDirection: 'row', marginLeft: -15, alignItems: 'center', marginBottom: 60 }}>
        <Icon
          name={'menu'}
          type={'simple-line-icon'}
          size={25}
          style={{ marginTop: 0, }}
          onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        />

        {/* <View style={styles.HeaderContainer}> */}
        <Text style={styles.WelcomeText}>Profile</Text>
        {/* </View> */}
      </View>

      <View style={styles.ProfileImageContainer} >
        <TouchableOpacity activeOpacity={0.6} style={{ borderRadius: 50 }} onPress={imageUploadHandler}>
          {uri ? <Image source={{ uri }} resizeMode={'contain'}/>
            : <>
              <Icon name={'account-circle'} size={100} color={'#9EABB5'} />
              <Icon name={'edit'} containerStyle={styles.EditIconContainer} />
            </>
          }

        </TouchableOpacity>
      </View>
      <View style={styles.InputContainer}>
        <Input
          placeholder={'Full name'}
          value={nameValue}
          leftIcon={<Icon name={'face'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onNameChangeText}
          errorMessage={nameError}
          onFocus={() => { setNameError(''); props.setError('') }}
          autoFocus
          autoCorrect={false}
        />
        <Input
          placeholder={'Email Id'}
          value={emailValue}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onEmailChangeText}
          errorMessage={emailError}
          onFocus={() => { setEmailError(''); props.setError('') }}
          autoCorrect={false}
        />
        <Input
          placeholder={'Address'}
          value={addressValue}
          leftIcon={<Icon name={'home'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onAddressChangeText}
          errorMessage={addressError}
          onFocus={() => { setEmailError(''); props.setError('') }}
          autoCorrect={false}
        />
      </View>
      <Button
        title={'Save'}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = (dispatch) => ({
  signUp: (username: string, emailValue: string, passwordValue: string) => dispatch(actions.signUp(username, emailValue, passwordValue)),
  setError: (error: string) => dispatch(actions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(actions.setLoading(isLoading)),
})

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileInternal)
