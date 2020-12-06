import React, { useState } from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, Input } from "react-native-elements"

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25,
  } as ViewStyle,

  HeaderContainer: {
    flex: 0.2,
    flexDirection: 'column',
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
    flex: 0.5,
    justifyContent: 'center'
  } as ViewStyle,

  LoginButtonContainer: {
    justifyContent: 'space-around',
  } as ViewStyle,

  FooterContainer: {
    flex: 0.4,
    justifyContent: 'space-between',
  } as ViewStyle,

  FooterText: {
    fontSize: 14,
    textAlign: 'center'
  } as TextStyle,

  LoginButton: {
    marginVertical: 10,
    justifyContent: 'center'
  } as ViewStyle,

  RegisterText: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle

})

export const Login = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const onEmailChangeText = (value:string) => {
    setEmailValue(value)
  }

  const onPasswordChangeText = (value:string) => {
    setPasswordValue(value)
  }

  return (
    <SafeAreaView style={styles.Container} >
      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Welcome,</Text>
        <Text style={styles.SubWelcomeText}>Sign In to continue!</Text>
      </View>
      <View style={styles.InputContainer}>
        <Input
          placeholder={'somewhere@address.com'}
          label={'Enter your email address'}
          value={emailValue}
          leftIcon={<Icon name={'email'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onEmailChangeText}
          autoFocus
        />
        <Input
          placeholder={'Password'}
          label={'Password'}
          value={passwordValue}
          leftIcon={<Icon name={'lock'}/>}
          leftIconContainerStyle={{ marginRight: 8 }}
          onChangeText={onPasswordChangeText}
          secureTextEntry
        />
      </View>
      <View style={styles.FooterContainer}>
        <View style={styles.LoginButtonContainer}>
          <Button title={'Login'} containerStyle={styles.LoginButton} titleStyle={{ fontSize: 16 }}/>
          <Button title={'Connect with Google'} containerStyle={styles.LoginButton}
            icon={
              <Icon
                type={"font-awesome-5"}
                name={'google'}
                iconStyle={{ marginHorizontal: 8 }}
              />
            }
            titleStyle={{ fontSize: 16 }}/>
        </View>
        <Text style={styles.FooterText}>I am a new user,
          <Text onPress={() => props.navigation.navigate('SignUpScreen')}> Register?</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}
