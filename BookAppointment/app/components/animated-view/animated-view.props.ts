import React from 'react'
import { ViewStyle } from 'react-native'

export interface AnimatedViewProps {
  children: React.ReactNode,
  style?: ViewStyle | ViewStyle[],
  disabled?: boolean,
  onPress?: () => void,
  speed?: number,
  shadowRatio?: number
  isShowAnimation?: boolean,
  isTouchable?: boolean,
}
