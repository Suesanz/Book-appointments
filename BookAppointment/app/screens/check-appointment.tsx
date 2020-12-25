import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios, { AxiosResponse } from 'axios'
import StatusPreset from '../presets/status-preset'

interface PickerEvent {
    type: string
}

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
    color: '#9EABB5'
  } as TextStyle,

  ListHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth
  } as ViewStyle,

  ListHeaderText: {
    fontSize: 18,
    color: '#0B0F19'
  } as TextStyle,

})

const renderHeader = () => {
  return (
    <View style={styles.ListHeaderContainer}>
      <Text style={styles.ListHeaderText}>Name</Text>
      <Text style={styles.ListHeaderText}>Status</Text>
    </View>
  )
}

const renderItem = ({ item }: { item: { status: number; appointerName: string } }) => {
// @ts-ignore
  const status = StatusPreset[item.status]
  return (
    <View style={styles.ListHeaderContainer}>
      <Text style={styles.ListHeaderText}>{item.appointerName}</Text>
      <Text style={styles.ListHeaderText}>{status}</Text>
    </View>
  )
}

export const CheckAppointment = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const url = `http://localhost:5001/book-appointments-37a0e/us-central1/getAppointments`
        const response: AxiosResponse = await axios.get(url)
        setList(response.data)
      } catch (error) {
        console.log('Error in sending request', error.message)
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.Container}>

      <View style={styles.HeaderContainer}>
        <Text style={styles.WelcomeText}>Book Appointment,</Text>
        <Text style={styles.SubWelcomeText}>Check all your appointments!</Text>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  )
}
