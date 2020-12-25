import React, { Component, FunctionComponent, memo } from "react"
import { Platform, View } from "react-native"
import ReactNativeModal from "react-native-modal"
import { Button } from "react-native-elements"
import DateTimePicker from "@react-native-community/datetimepicker"

interface RNDateTimePickerProps {
    isVisible:boolean
    onSelect:()=>void
    mode:'time'|'date'|undefined
    pickerValue:Date
    onChange:(event:Event, selectedDate:Date|undefined)=>void
    reset:()=>void
}

const isIOS = Platform.OS === 'ios'

export const RNDateTimePicker:FunctionComponent<RNDateTimePickerProps> = memo((props:any) => {

  const { isVisible, onSelect, mode, pickerValue, reset, onChange } = props

  return isIOS ? (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 15 }}>
        <DateTimePicker
          value={pickerValue}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
          <Button title={'OK'} style={{ width: 80 }} titleStyle={{ fontSize: 14 }} onPress={onSelect}/>
          <Button title={'Reset'} style={{ width: 80 }} titleStyle={{ fontSize: 14 }} onPress={reset}/>
        </View>
      </View>
    </ReactNativeModal>
  )
    : (isVisible && (
      <DateTimePicker
        value={pickerValue}
        mode={mode}
        is24Hour={false}
        onChange={onChange}
      />
    ))

})
