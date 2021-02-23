import { StyleSheet, Animated } from 'react-native'

export const styles = StyleSheet.create({
  Container: {
    shadowColor: '#000000',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  Disabled: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  ContainerWithShadow: {
    borderRadius: 6,
    backgroundColor: '#ffffff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
})

// ANIMATION
export const shadow = animatedValue => ({
  shadowColor: '#000',
  shadowOpacity: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.34],
  }),
  shadowRadius: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3.84, 6.27],
  }),
  shadowOffset: {
    width: 0,
    height: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 5],
    }),
  },

  elevation: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 10],
  }),
})
