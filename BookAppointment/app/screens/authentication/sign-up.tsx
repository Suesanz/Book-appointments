import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ImageStyle,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { launchImageLibrary } from 'react-native-image-picker'
import { Button, Icon, Input } from 'react-native-elements'
import * as actions from '../../store/actions/auth-actions'
import { connect } from "react-redux"
import validate from 'validate.js'
import storage from '@react-native-firebase/storage'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25
  } as ViewStyle,

  HeaderContainer: {
    justifyContent: 'flex-start',
    marginBottom: 40
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19'
  } as TextStyle,

  SubWelcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#9EABB5'
  } as TextStyle,

  InputContainer: {
    justifyContent: 'center'
  } as ViewStyle,

  LoginButtonContainer: {
    justifyContent: 'space-around'
  } as ViewStyle,

  FooterContainer: {
    flex: 1,
    justifyContent: 'space-between'
  } as ViewStyle,

  FooterText: {
    fontSize: 14,
    textAlign: 'center'
  } as TextStyle,

  LoginButton: {
    marginVertical: 10,
    justifyContent: 'center'
  } as ViewStyle,

  SignInText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2089dc'
  } as ViewStyle,

  SignUpError: {
    fontSize: 14,
    textAlign: 'center',
    height: 30,
    color: 'red',
  } as TextStyle,

  ProfileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    width: 100,
    marginBottom: 20,
    alignSelf: 'center'
  } as ViewStyle,

  ProfileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  } as ImageStyle,

  EditIconContainer: {
    position: "absolute",
    zIndex: 10,
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end'
  } as ViewStyle

})

interface SignUpProps {
  setLoading: (arg0: boolean) => void
  signUp: (username: string, emailValue: string, passwordValue: string) => void
  navigation: { navigate: (arg0: string) => void }
  setError: (arg0: string) => void
  isLoggedIn: boolean
  isLoading: boolean
  errorMessage: string
}

const constraints = {
  username: {
    presence: true,
    format: {
      pattern: /^[A-Za-z ]+$/,
      message: function (value: string) {
        return validate.format('^Please enter a valid name', {
          num: value
        })
      }
    }
  },

  email: {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },

  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters'
    }
  }
}

export const SignUpInternal = (props: SignUpProps) => {
  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [uri, setUri] = useState<string>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const emailInputRef = useRef<Input>(null)
  const passwordInputRef = useRef<Input>(null)
  const nameInputRef = useRef<Input>(null)

  const onEmailChangeText = (value: string) => { setEmailValue(value) }
  const onPasswordChangeText = (value: string) => { setPasswordValue(value) }
  const onNameChangeText = (value: string) => { setNameValue(value) }

  useEffect(() => {
    if (props.isLoggedIn) {
      props.navigation.navigate('HomeScreen')
    }
  }, [props.isLoggedIn])

  const signUpHandler = async () => {
    props.setLoading(true)
    nameInputRef.current && nameInputRef.current.blur()
    emailInputRef.current && emailInputRef.current.blur()
    passwordInputRef.current && passwordInputRef.current.blur()

    const error = validate({ username: nameValue, email: emailValue, password: passwordValue }, constraints)

    error?.username && setNameError(error.username[0])
    error?.email && setEmailError(error.email[0])
    error?.password && setPasswordError(error.password[0])

    if (!error?.username && !error?.email && !error?.password) {
      await props.signUp(nameValue, emailValue, passwordValue)

      if (uri) {
        const reference = storage().ref(`${emailValue?.toLowerCase()}-profile-image.png`)
        const pathToFile = `${uri}`
        try {
          await reference.putFile(pathToFile)
        } catch (e) {
          props.setError('Image not supported!')
        }
      }
    } else {
      props.setError('Invalid credentials!')
    }

    props.setLoading(false)
  }

  const imageUploadHandler = async () => {
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
        <Text style={styles.WelcomeText}>Create Account,</Text>
        <Text style={styles.SubWelcomeText}> Sign up to get started!</Text>
      </View>

      <TouchableOpacity activeOpacity={0.6} style={styles.ProfileImageContainer} onPress={imageUploadHandler}>
        {isImageLoading
          ? <ActivityIndicator size={'small'} color={'grey'}/>
          : (uri
            ? <Image
              source={{ uri }}
              resizeMode={'cover'}
              style={styles.ProfileImage}
            />
            : <>
              <Icon name={'account-circle'} size={100} color={'#9EABB5'}/>
              <Icon name={'edit'} containerStyle={styles.EditIconContainer}/>
            </>
          )
        }
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.InputContainer} behavior={'height'}>
        <Input
          ref={nameInputRef}
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
          ref={emailInputRef}
          placeholder={'Email Id'}
          value={emailValue}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onEmailChangeText}
          errorMessage={emailError}
          onFocus={() => { setEmailError(''); props.setError('') }}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <Input
          ref={passwordInputRef}
          placeholder={'Password'}
          value={passwordValue}
          leftIcon={<Icon name={'lock'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onPasswordChangeText}
          errorMessage={passwordError}
          onFocus={() => { setPasswordError(''); props.setError('') }}
          secureTextEntry={true}
          autoCorrect={false}
        />
      </KeyboardAvoidingView>

      <Text style={styles.SignUpError}>{props.errorMessage}</Text>

      <View style={styles.FooterContainer}>
        <View style={styles.LoginButtonContainer}>
          <Button title={'Sign up'} containerStyle={styles.LoginButton} onPress={signUpHandler} loading={props.isLoading}/>
          <Button title={'Connect with Google'} containerStyle={styles.LoginButton}
            icon={
              <Icon
                type={'font-awesome-5'}
                name={'google'}
                iconStyle={{ marginHorizontal: 8 }}
              />
            }
          />
        </View>
        <Text style={styles.FooterText}>Already a user,
          <Text style={styles.SignInText} onPress={() => props.navigation.navigate('LoginScreen')}> Sign In?</Text>
        </Text>
      </View>

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
  profileImageUri: state.auth.profileImageUri
})

const mapDispatchToProps = (dispatch) => ({
  signUp: (username: string, emailValue: string, passwordValue: string) => dispatch(actions.signUp(username, emailValue, passwordValue)),
  setError: (error: string) => dispatch(actions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(actions.setLoading(isLoading)),
})

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpInternal)
