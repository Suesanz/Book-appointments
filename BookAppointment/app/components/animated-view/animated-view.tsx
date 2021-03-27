import React, { useRef, memo } from 'react'
import { Animated, View } from 'react-native'
import { AnimatedViewProps } from './animated-view.props'
import { styles } from './animated-view.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DEFAULT_SPEED = 75

export const RenderCardViewWithAnimation: React.FunctionComponent<AnimatedViewProps> = memo( props => {
  const { children, style, disabled, onPress, speed = DEFAULT_SPEED } = props

  const animated = useRef(new Animated.Value(1)).current

  const shadowActive = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: speed,
      useNativeDriver: false,
    }).start()
  }

  const shadowInActive = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: speed,
      useNativeDriver: false,
    }).start()
  }
  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  })
  return (
    <Animated.View style={[
      styles.Container,
      style,
      {
        transform: [{
          translateY,
        }],
      },
    ]}>
      <TouchableOpacity
        disabled={disabled || !onPress}
        activeOpacity={1}
        onPress={onPress}
        onPressIn={shadowInActive}
        onPressOut={shadowActive}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  )
})

const renderCardViewWithTouchable = (children, style, disabled, onPress) => {
  return (
    <TouchableOpacity
      style={[
        styles.ContainerWithShadow,
        style,
      ]}
      disabled={disabled || !onPress}
      activeOpacity={0.6}
      onPress={(onPress)}
    >
      {children}
    </TouchableOpacity>)
}

const renderCardView = (children, style) => {
  return (
    <View style={[
      styles.ContainerWithShadow,
      style,
    ]}>
      {children}
    </View>
  )
}

export const CardView: React.FunctionComponent<AnimatedViewProps> = memo( props => {
  const { children, style, disabled, onPress, speed = DEFAULT_SPEED, isShowAnimation, isTouchable } = props

  if (isShowAnimation) {
    return (
      <RenderCardViewWithAnimation
        style={style}
        disabled={disabled}
        onPress={onPress}
        speed={speed}
        {...props}
      >
        {children}
      </RenderCardViewWithAnimation>)
  }

  if (isTouchable) { return (renderCardViewWithTouchable(children, style, disabled, onPress)) }

  return (renderCardView(children, style))
})
