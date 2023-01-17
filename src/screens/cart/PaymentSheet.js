import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'


const PaymentSheet = ({ navigation, route }) => {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    console.log("PARAMS", route.params.url)
    setUrl(route.params.url)
  }, [url])


  return (
    <View style={{ width: "100%", height: "100%" }}>
      <WebView
        source={{ uri: url }}
        onLoad={console.log("LOADED")}
      />

    </View>
  )
}

export default PaymentSheet
