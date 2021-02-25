import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import validate from 'validate.js'
import * as actions from "../../store/actions"
import { connect } from "react-redux"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25
  } as ViewStyle,

  HeaderContainer: {
    justifyContent: 'flex-start',
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
    flex: 0.4,
    justifyContent: 'center'
  } as ViewStyle,

  LoginButtonContainer: {
    justifyContent: 'space-around'
  } as ViewStyle,

  FooterContainer: {
    flex: 0.3,
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
  } as ViewStyle

})

interface SignUpProps {
  setLoading: (arg0: boolean) => void
  signUp: (arg0: string, arg1: string) => any
  isLoggedIn: boolean
  navigation: { navigate: (arg0: string) => void }
  setError: (arg0: string) => void
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

  const profileImageRef = useRef<Image>(null)

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

  console.log('isLoggedIn', props.isLoggedIn)
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

      await props.signUp(emailValue, passwordValue)

    } else {
      props.setError('Invalid credentials!')
    }

    props.setLoading(false)
  }

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
    <SafeAreaView style={styles.Container} >

      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Create Account,</Text>
        <Text style={styles.SubWelcomeText}> Sign up to get started!</Text>
      </View>

      <View style={styles.ProfileImageContainer} >
        <TouchableOpacity activeOpacity={0.6} style={{ borderRadius: 50 }} onPress={imageUploadHandler}>
          {uri ? <Image ref={profileImageRef} source={{ uri }} resizeMode={'contain'}/>
            : <>
              <Icon name={'account-circle'} size={100} color={'#9EABB5'} />
              <Icon name={'edit'} containerStyle={styles.EditIconContainer} />
            </>
          }

        </TouchableOpacity>
      </View>

      <View style={styles.InputContainer}>
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
      </View>

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
  signUp: (emailValue: string, passwordValue: string) => dispatch(actions.signUp(emailValue, passwordValue)),
  setError: (error: string) => dispatch(actions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(actions.setLoading(isLoading)),
})

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpInternal)
