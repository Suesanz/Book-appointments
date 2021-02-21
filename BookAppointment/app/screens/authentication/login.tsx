import React, { useRef, useState } from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import validate from 'validate.js'
import { connect } from "react-redux"
import * as actions from '../../store/actions/index'
import { Dispatch } from "redux"

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25
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
    fontWeight: 'normal',
    color: '#9EABB5'
  } as TextStyle,

  InputContainer: {
    flex: 0.5,
    justifyContent: 'center'
  } as ViewStyle,

  LoginButtonContainer: {
    justifyContent: 'space-around'
  } as ViewStyle,

  FooterContainer: {
    flex: 0.4,
    justifyContent: 'space-between'
  } as ViewStyle,

  FooterText: {
    fontSize: 14,
    textAlign: 'center'
  } as TextStyle,

  LoginButton: {
    marginVertical: 10,
    justifyContent: 'center',
  } as ViewStyle,

  RegisterText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2089dc'
  } as ViewStyle,

  LoginError: {
    fontSize: 14,
    textAlign: 'center',
    height: 30,
    color: 'red'
  }
})

const LoginInternal = (props) => {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const emailInputRef = useRef<Input>(null)
  const passwordInputRef = useRef<Input>(null)

  const constraints = {
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

  const onEmailChangeText = (value:string) => {
    setEmailValue(value)
  }

  const onPasswordChangeText = (value:string) => {
    setPasswordValue(value)
  }

  const loginHandler = async () => {
    props.setLoading(true)
    emailInputRef.current && emailInputRef.current.blur()
    passwordInputRef.current && passwordInputRef.current.blur()

    const error = validate({ email: emailValue, password: passwordValue }, constraints)

   error?.email && setEmailError(error.email[0])
   error?.password && setPasswordError(error.password[0])

   if (!error?.email && !error?.password) {
     await props.login(emailValue, passwordValue)

     console.log('isLoggedIn', props.isLoggedIn)

     if (props.isLoggedIn) {
       props.navigation.navigate('HomeScreen')
     } else {
       props.setError(props.errorMessage)
     }

   } else {
     props.setError('Invalid credentials!')
   }

   props.setLoading(false)
  }

  return (
    <SafeAreaView style={styles.Container} >
      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Welcome,</Text>
        <Text style={styles.SubWelcomeText}>Sign In to continue!</Text>
      </View>
      <View style={styles.InputContainer}>
        <Input
          ref={emailInputRef}
          containerStyle={{ marginVertical: 20 }}
          placeholder={'somewhere@address.com'}
          label={'Enter your email address'}
          value={emailValue}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onEmailChangeText}
          autoCapitalize={'none'}
          errorMessage={emailError}
          onFocus={() => { setEmailError(''); props.setError('') }}
          autoFocus
        />
        <Input
          ref={passwordInputRef}
          placeholder={'Password'}
          label={'Password'}
          value={passwordValue}
          leftIcon={<Icon name={'lock'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onPasswordChangeText}
          errorMessage={passwordError}
          onFocus={() => { setPasswordError(''); props.setError('') }}
          secureTextEntry
        />
      </View>
      <Text style={styles.LoginError}>{props.errorMessage}</Text>
      <View style={styles.FooterContainer}>
        <View style={styles.LoginButtonContainer}>
          <Button
            title={'Login'}
            buttonStyle={{ justifyContent: 'center' }}
            containerStyle={styles.LoginButton}
            titleStyle={{ fontSize: 16 }}
            onPress={loginHandler}
            loading={props.isLoading}
            disabled={props.isLoading}
          />
          <Button title={'Connect with Google'} containerStyle={styles.LoginButton}
            icon={
              <Icon
                type={'font-awesome-5'}
                name={'google'}
                iconStyle={{ marginHorizontal: 8 }}
              />
            }
            titleStyle={{ fontSize: 16 }}
            onPress={() => props.navigation.navigate('HomeScreen')}
          />
        </View>
        <Text style={styles.FooterText}>I am a new user,
          <Text style={styles.RegisterText} onPress={() => props.navigation.navigate('SignUpScreen')}> Register?</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  login: (emailValue: string, passwordValue: string) => dispatch(actions.login(emailValue, passwordValue)),
  setError: (error: string) => dispatch(actions.setError(error)),
  setLoading: (isLoading: boolean) => dispatch(actions.setLoading(isLoading)),
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginInternal)
