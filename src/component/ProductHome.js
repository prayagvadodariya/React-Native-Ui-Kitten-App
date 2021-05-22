import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import shopify from '../config/shopify';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';


 const ProductHome = (props) => {
    const colors  = useTheme();   
    const featured_products = props.settings;
    const [product, setProduct] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {    
      
      shopify.product.fetchMultiple(featured_products.products).then((product) => {
      setProduct(product)
      // console.log('product',product);
      }).catch((error)=> {console.log("error",error);})
    }, []);

  return (
    <View>

      <View>
        <ContentText>{featured_products.heading.text}</ContentText>
        <ContentImage/>
      </View> 

      <FlatList  horizontal={true}
        keyExtractor={(item, index) => String(index)} 
        data={product}  
        extraData={colors}
        renderItem={({item}) => 
        <View> 
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetailsStack",{ screen: 'ProductDetails', params: { Producthandel: item.handle }})}>
            <View style={styles.flat_layout}><Image source={{uri: item.images[0].src}} resizeMode='stretch' style={{height: "100%", width:'100%'}} /></View>
            <Text style={{ paddingRight:10, paddingLeft:10, width: Dimensions.get('screen').width / 2 - 10, margin:5, textAlign:"center", color:colors.colors.text, fontSize:15, fontWeight:"bold" }}>{item.title}</Text> 
          </TouchableOpacity>    
          <View style={styles.cover}>
            <Text style={{ color: colors.colors.text, marginTop:10, fontSize:15, }}>{item.variants[0].priceV2.amount}</Text>
              <TouchableOpacity>
                <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color={colors.colors.text} size={15} />
              </TouchableOpacity>  
          </View>
        </View>
        }
      />  
      </View>
  );
}

const styles = StyleSheet.create({
flat_layout: {
  width: Dimensions.get('screen').width / 2 - 20,
  height: 200, 
  margin: 10 
},
cover: {
  flex:1,
  flexDirection:"row",
  justifyContent:"center",
},
});

export default ProductHome;
