import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/core'

const FocusedStatusBar = (props) => {
    const isSFocused = useIsFocused()
  return isSFocused ? <StatusBar animated={true} {...props} /> : null;
}

export default FocusedStatusBar