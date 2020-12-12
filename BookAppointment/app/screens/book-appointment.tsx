import React, {useState} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Icon, Input} from 'react-native-elements';

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
    color: '#0B0F19',
  } as TextStyle,

  SubWelcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#9EABB5',
  } as TextStyle,

  InputContainer: {
    flex: 0.5,
    justifyContent: 'center',
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
    textAlign: 'center',
  } as TextStyle,

  LoginButton: {
    marginVertical: 10,
    justifyContent: 'center',
  } as ViewStyle,

  RegisterText: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});

export const BookAppointment = (props) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const onEmailChangeText = (value: string) => {
    setEmailValue(value);
  };

  const onPasswordChangeText = (value: string) => {
    setPasswordValue(value);
  };

  const onNameChangeText = (value: string) => {
    setNameValue(value);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Book Appointment,</Text>
        <Text style={styles.SubWelcomeText}>
          {' '}
          Enter details of the appointer!
        </Text>
      </View>
      <View style={styles.InputContainer}>
        <Input
          placeholder={'Full name'}
          value={nameValue}
          leftIcon={<Icon name={'face'} />}
          leftIconContainerStyle={{marginRight: 8}}
          onChangeText={onNameChangeText}
          autoFocus
        />
        <Input
          placeholder={'Email Id'}
          value={emailValue}
          leftIcon={<Icon name={'email'} />}
          leftIconContainerStyle={{marginRight: 8}}
          onChangeText={onEmailChangeText}
        />
      </View>
      <View style={styles.FooterContainer}>
        <Button
          title={'Book appointment'}
          containerStyle={styles.LoginButton}
        />
      </View>
    </SafeAreaView>
  );
};
