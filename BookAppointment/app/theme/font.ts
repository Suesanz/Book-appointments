import * as Font from 'expo-font'

const defaultFontNames = {
  light: 'SourceSansPro-Light',
  regular: 'SourceSansPro-Regular',
  semibold: 'SourceSansPro-SemiBold',
  bold: 'SourceSansPro-Bold',
  italic: 'SourceSansPro-Italic',
}

const defaultFontPaths = {
  'SourceSansPro-Light': require('./fonts/SourceSansPro-Light.ttf'),
  'SourceSansPro-Regular': require('./fonts/SourceSansPro-Regular.ttf'),
  'SourceSansPro-SemiBold': require('./fonts/SourceSansPro-SemiBold.ttf'),
  'SourceSansPro-Bold': require('./fonts/SourceSansPro-Bold.ttf'),
  'SourceSansPro-Italic': require('./fonts/SourceSansPro-Italic.ttf'),
}

export const fonts = defaultFontNames

export const initFonts = async () => {
  await Font.loadAsync(defaultFontPaths)
}
