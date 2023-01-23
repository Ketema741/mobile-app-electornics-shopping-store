import React, { useContext, useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import { COLORS } from "../../constants";
import { NFTData } from '../../constants'
import CartProduct from './CartProduct';
import productContext from '../../context/product/productContext';


export default Cart = ({ navigation }) => {
  const ProductContext = useContext(productContext)
  const { cart } = ProductContext
  const products = cart

  // from Jeremy 
  const [ready, setReady] = useState(false)
  const [url, setUrl] = useState('')

  const checkOut = async () => {
    const body = {
      items: products
    }

    try {
      // console.log(JSON.stringify(body))
      const res = await axios.post('http://10.4.112.184:4420/api/payment/create-checkout-session', body)
      const result = await res.data;
      setUrl(result.url)
      if (url) {
        return navigation.navigate('Payment', { url: url })
      }else{
        console.log("loading....")
      }
    } catch (error) {
      console.log("The Error", error)
    }
  };

  useEffect(() => {
    // console.log(url)

  }, [url])


  return (
    <View>
      <View style={{ paddingHorizontal: 16 }}>
        {products ?
          <FlatList
            ListHeaderComponent={<Header />}
            data={products}
            renderItem={({ item }) => <CartProduct product={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={Footer}
          />
          : null
        }
      </View>

      <View style={styles.checkOutContainer}>
        <TouchableOpacity onPress={checkOut} style={styles.checkOut}>
          <Text style={styles.checkOutText}>
            CHECKOUT ETB 20
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Header = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.orderDetailContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" style={styles.iconLeft} />
        </TouchableOpacity>
        <Text style={styles.orderDetailText}>
          Order Details
        </Text>
        <View></View>
      </View>

      <Text style={styles.orderCartText}>
        My Cart
      </Text>
    </>
  )
}


const Footer = () => {
  return (

    <View>
      <View style={styles.deliveryLocationContainer}>
        <Text style={styles.deliveryLocationText}>
          Delivery Location
        </Text>
        <View style={styles.deliveryLocationDetailContainer}>

          <View style={styles.deliveryLoctionDetail}>

            <View style={styles.deliveryTruckIcon}>
              <MaterialCommunityIcons name="truck-delivery-outline" style={styles.truckDeliveryOutline} />
            </View>

            <View>
              <Text style={styles.deliveryAddressText1}>
                2 Petre Melikishvili St.
              </Text>
              <Text
                style={styles.deliveryAddressText2}>
                0162, Tbilisi
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" style={styles.chevronRight} />
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentMethodText}>
          Payment Method
        </Text>
        <View style={styles.paymentMethodContainer}>
          <View style={styles.paymentMethodDetail}>
            <View style={styles.paymentMethodVisa}>
              <Text style={styles.paymentMethodVisaText1}>
                VISA
              </Text>
            </View>
            <View>
              <Text style={styles.paymentMethodVisaText2}>
                Visa Classic
              </Text>
              <Text style={styles.paymentMethodVisaId}>
                ****-9092
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" style={styles.chevronRight} />
        </View>
      </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.orderInfoText}>
          Order Info
        </Text>
        <View style={styles.orderSubTotalContainer}>
          <Text style={styles.orderSubtotalText}>
            Subtotal
          </Text>
          <Text style={styles.orderSubTotalValue}>
            ETB 778.00
          </Text>
        </View>

        <View
          style={styles.orderShippingContainer}>
          <Text style={styles.orderShippingText}>
            Shipping Tax
          </Text>
          <Text style={styles.orderShippingValue}>
            ETB 878
          </Text>
        </View>

        <View style={styles.orderTotalContainer}>
          <Text style={styles.orderTotalText}>
            Total
          </Text>
          <Text style={styles.orderTotalValue}>
            ETB 35
          </Text>
        </View>
      </View>
    </View>
  )
}

// CSS STYLES
const styles = StyleSheet.create({
  orderDetailContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLeft: {
    fontSize: 20,
    color: COLORS.black,
    padding: 12,
    marginTop: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  orderDetailText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '400',
  },
  orderCartText: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: '500',
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
  },
  deliveryLocationContainer: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  deliveryLocationText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  deliveryLoctionDetail: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  deliveryLocationDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryTruckIcon: {
    color: COLORS.blue,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  truckDeliveryOutline: {
    fontSize: 18,
    color: COLORS.blue,
  },
  deliveryAddressText1: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  deliveryAddressText2: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.5,
  },
  chevronRight: {
    fontSize: 22,
    color: COLORS.black
  },
  paymentContainer: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodDetail: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  paymentMethodVisa: {
    color: COLORS.blue,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  paymentMethodVisaText1: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.blue,
    letterSpacing: 1,
  },
  paymentMethodVisaText2: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  paymentMethodVisaId: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.5,
  },
  chevronRight: {
    fontSize: 22,
    color: COLORS.black
  },
  orderInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 80,
  },
  orderInfoText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  orderSubTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderSubtotalText: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLORS.black,
    opacity: 0.5,
  },
  orderSubTotalValue: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    opacity: 0.8,
  },
  orderShippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  orderShippingText: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLORS.black,
    opacity: 0.5,
  },
  orderShippingValue: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    opacity: 0.8,
  },
  orderTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTotalText: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLORS.black,
    opacity: 0.5,
  },
  orderTotalValue: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  checkOutContainer: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOut: {
    width: '86%',
    height: '90%',
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOutText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.white,
    textTransform: 'uppercase',
  }
})