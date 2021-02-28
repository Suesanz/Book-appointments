import { AccessibilityInfo, Dimensions, I18nManager, NativeModules, Platform } from 'react-native'
import Constants from 'expo-constants'
import { initialWindowMetrics } from 'react-native-safe-area-context'

const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
}

const isAndroid = Platform.OS === 'android'
const isIOS = Platform.OS === 'ios'

let isTablet: boolean
let statusBarHeight: number
let screenHeight = Dimensions.get('screen').height
let screenWidth = Dimensions.get('screen').width
let windowHeight = Dimensions.get('window').height
let windowWidth = Dimensions.get('window').width

const insetTop = initialWindowMetrics.insets.top
const insetBottom = initialWindowMetrics.insets.bottom

function setStatusBarHeight() {
  const { StatusBarManager } = NativeModules
  statusBarHeight = 0 // so there will be a value for any case
  statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT
  if (isIOS) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight((data: any) => (statusBarHeight = data.height))
  }
}

function getAspectRatio() {
  return screenWidth < screenHeight
    ? screenHeight / screenWidth
    : screenWidth / screenHeight
}

function isIphoneX() {
  return isIOS && !Platform['isPad'] && !Platform['isTVOS'] && (screenHeight >= 812 || screenWidth >= 812)
}

function getOrientation(height: number, width: number) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE
}

export function updateConstants(dimensions: any) {
  screenHeight = dimensions.screen.height
  screenWidth = dimensions.screen.width
  windowWidth = dimensions.window.width
  windowHeight = dimensions.window.height

  setStatusBarHeight()
}

isTablet = Platform['isPad'] || (getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900)

const accessibility = { isScreenReaderEnabled: false }

function handleScreenReaderChanged(isScreenReaderEnabled) {
  accessibility.isScreenReaderEnabled = isScreenReaderEnabled as boolean
}

function setAccessibility() {
  AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
    accessibility.isScreenReaderEnabled = isScreenReaderEnabled
  })
}
const BuildConfig = NativeModules.BuildConfig

export const Device = {
  orientations,

  isAndroid,
  isIOS,
  isRTL: I18nManager.isRTL,

  getAndroidVersion: () => { return isAndroid ? parseInt(Platform.Version as string, 10) : undefined },

  get insetTop() { return insetTop },
  get insetBottom() { return insetBottom },

  get accessibility() { return accessibility },
  get orientation() { return getOrientation(screenHeight, screenWidth) },
  get isLandscape() { return getOrientation(screenHeight, screenWidth) === orientations.LANDSCAPE },
  get screenWidth() { return screenWidth },
  get screenHeight() { return screenHeight },
  get windowWidth() { return windowWidth },
  get windowHeight() { return windowHeight },
  get isSmallScreen() { return screenWidth <= 340 },
  get isShortScreen() { return screenHeight <= 600 },
  get screenAspectRatio() { return getAspectRatio() },
  get isTablet() { return isTablet },
  get tabBarHeight() { return 55 },
  set isTablet(value: boolean) { isTablet = value },
  get statusBarHeight() { return statusBarHeight },

  getSafeAreaInsets: () => {
    const orientation = getOrientation(screenHeight, screenWidth)
    return orientation === orientations.LANDSCAPE
      ? { left: 44, right: 44, bottom: 24, top: 0 }
      : { left: 0, right: 0, bottom: 34, top: 44 }
  },

  get isIphoneX() { return isIphoneX() },

  addDimensionsEventListener: (callback: any) => {
    Dimensions.addEventListener('change', callback)
  },

  removeDimensionsEventListener: (callback: any) => {
    Dimensions.removeEventListener('change', callback)
  },

  get buildType (): string {
    return BuildConfig.BUILD_TYPE
  },

  get isDebug(): boolean {
    return __DEV__
  },

}

setAccessibility()

setStatusBarHeight()

AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged)

Dimensions.addEventListener('change', updateConstants)

export default Device
