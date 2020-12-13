import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    margin: 25
  } as ViewStyle,

  HeaderContainer: {
    // flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  } as ViewStyle,

  WelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B0F19',
    marginBottom: 25
  } as TextStyle,

  SubWelcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#9EABB5'
  } as TextStyle,

  BookAppointmentContainer: {
    height: 150,
    borderWidth: 1,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle

})

export const Home = (props) => {
  return (
    <SafeAreaView style={styles.Container} >
      {/* <View style={styles.HeaderContainer}> */}
      <Text style={styles.WelcomeText}>Welcome,</Text>
      {/* </View> */}
      <Text style={styles.SubWelcomeText}>Book appointments!</Text>
      <View>
        <TouchableOpacity style={styles.BookAppointmentContainer} onPress={() => props.navigation.navigate('BookAppointmentScreen')}>
          <Text>
        Book an appointment
          </Text>
        </TouchableOpacity>
        <View style={styles.HeaderContainer}>
          <Text style={styles.SubWelcomeText}>Check appointments!</Text>
        </View>
        <TouchableOpacity style={styles.BookAppointmentContainer}>
          <Text>
        Check your appointments
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
