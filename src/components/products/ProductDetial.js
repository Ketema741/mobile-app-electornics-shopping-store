import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { COLORS, SIZES, FONTS } from '../../constants'
import { EthPrice } from '../productDetail/SubInfo'

import ProductContext from "../../context/product/productContext";

const ProductDetial = () => {
  const productContext = useContext(ProductContext)
  const { item } = productContext

  const [imageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    if (item) {
      setImageUrl(item.url);
    }
  }, [item]);


  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={item._id}
    >

      {imageUrl &&
        <Image
          source={{ uri: imageUrl }}
          resizeMode="contain"
          onError={() => console.log('Error')}
          style={{ width: 48, height: 48 }}
        />
      }

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          Item  {item.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          {item.date}
        </Text>
      </View>

      <EthPrice price={item.price} />
    </View>
  )
}

export default ProductDetial