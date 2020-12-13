import React, { useRef, useState } from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from 'react-native-elements'
import validate from 'validate.js'
import { firebase } from '../../config/firebase-config'

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
    color: 'red'
  }as TextStyle
})

export const SignUp = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [signUpError, setSignUpError] = useState<string>('')

  const [isLoading, setLoading] = useState<boolean>(false)

  const emailInputRef = useRef<Input>(null)
  const passwordInputRef = useRef<Input>(null)
  const nameInputRef = useRef<Input>(null)

  const constraints = {
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
  // /^[A-Za-z ]+$/.test(x)
  const onNameChangeText = (value:string) => {
    setNameValue(value)
  }

  const signUpHandler = () => {
    setLoading(true)
    nameInputRef.current && nameInputRef.current.blur()
    emailInputRef.current && emailInputRef.current.blur()
    passwordInputRef.current && passwordInputRef.current.blur()

    const error = validate({ username: nameValue, email: emailValue, password: passwordValue }, constraints)

    error?.username && setNameError(error.username[0])
    error?.email && setEmailError(error.email[0])
    error?.password && setPasswordError(error.password[0])

    if (!error?.username && !error?.email && !error?.password) {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((response:any) => {
          console.log('response', JSON.stringify(response))
          const uid = response.user.uid
          const data = {
            id: uid,
            email: emailValue,
            name: nameValue
          }
          const usersRef = firebase.default.firestore().collection('/authUsers')
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              console.log('here')
              props.navigation.navigate('HomeScreen')
            })
            .catch((error:firebase.default.firestore.FirestoreError) => {
              console.log('Firestore error: ', error.message)
              setSignUpError(error.message)
            })
        })
        .catch((error:firebase.default.FirebaseError) => {
          console.log('Registration Error: ', error.message)
          setSignUpError(error.message)
        })
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={styles.Container} >
      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Create Account,</Text>
        <Text style={styles.SubWelcomeText}> Sign up to get started!</Text>
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
          onFocus={() => setNameError('')}
          autoFocus
        />
        <Input
          ref={emailInputRef}
          placeholder={'Email Id'}
          value={emailValue}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onEmailChangeText}
          errorMessage={emailError}
          onFocus={() => { setEmailError('') }}
        />
        <Input
          ref={passwordInputRef}
          placeholder={'Password'}
          value={passwordValue}
          leftIcon={<Icon name={'lock'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onPasswordChangeText}
          errorMessage={passwordError}
          onFocus={() => { setPasswordError('') }}
          secureTextEntry={true}
        />
      </View>
      <Text style={styles.SignUpError}>{signUpError}</Text>
      <View style={styles.FooterContainer}>
        <View style={styles.LoginButtonContainer}>
          <Button title={'Sign up'} containerStyle={styles.LoginButton} onPress={signUpHandler} loading={isLoading}/>
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
