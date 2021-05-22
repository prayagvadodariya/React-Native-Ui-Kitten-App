import React, { Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native'
import shopify from '../config/shopify';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';

const Shop = (props) => {
  const categories = props.item;
  const [shop, setShop] = useState([]);
  const [shopimage, setShopimage] = useState('');
  const [loadin,setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => { 
    shopify.collection.fetch(categories).then((collections) => {
    setShopimage(collections.image.src)
    setShop(collections)
    }).catch((error)=> {console.log("error",error);})
  }, []);

    return (
      <View style={styles.content}>  
        <TouchableOpacity style={styles.top} onPress={() => navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: shop.handle },})}>
          <ImageBackground
            resizeMode='stretch' style={{height: "100%"}} 
            source={{uri:shopimage}}>
                <View style={styles.buttom}>
                <Text style={styles.text1}>SHOP</Text>
                <Text style={styles.text2}>{shop.title}</Text>
                </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }



const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    marginBottom:5
  },
  top: {
    position: 'relative',
     width: "100%",
     height: 550,
   },
  buttom: {
    position: 'absolute',
    bottom: 0,
    width:"100%",
    height:110,
    backgroundColor:"rgba(94, 41, 14, 0.9)",
  },
  text1: {
    textTransform:'uppercase',
    marginTop:12,
    fontSize:20,
    textAlign:"center",
    fontFamily:"text1",
    color:"#ffffff"
  },
  text2: {
    textTransform:'uppercase',
    marginTop:1,
    fontSize:50,
    textAlign:"center",
    fontFamily:"text2",
    color:"#ffffff"      
  },
  });

export default Shop;