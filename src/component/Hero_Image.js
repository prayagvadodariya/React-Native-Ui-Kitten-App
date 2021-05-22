import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Chip, Paragraph, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser';

const Hero_Image = (props) => {
  const colors = useTheme();
  const hero_image = props.settings;
  const navigation = useNavigation();


  const onNext = async (val) => {
    if(val.button.link?.screen==='Products'){
      navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: val.button.link.param.handle },})
    }else if(val.button.link===null || val.param.screen==='External'){
      await WebBrowser.openBrowserAsync(val.param.param.url);
      // console.log('link',val);
    }
  }

    return (
        <View style={{position: 'relative', width: "100%", height: 240, backgroundColor: colors.colors.background}}>
          <ImageBackground resizeMode='stretch' style={{height: "100%"}} source={{ uri: hero_image.image.url }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              {hero_image?.icon?.url!=''?<Image resizeMode="contain" style={styles.hero_icon} source={{ uri: hero_image.icon?.url }}/>:null}
              {hero_image?.heading?.text!=''?<Text style={{fontSize:hero_image?.heading?.style?.fontSize, marginTop:15, textAlign:"center", color:hero_image?.heading?.style?.color?.value, fontFamily:'roboto'}}>{hero_image?.heading?.text}</Text>:null} 
              {hero_image?.subHeading?.text!=''?<Text style={{fontSize:hero_image?.subHeading?.style?.fontSize, textAlign:"center", color:hero_image?.subHeading?.style?.color?.value, fontFamily:'net', fontWeight:"normal", textTransform:'uppercase'}}>{hero_image?.subHeading?.text}</Text>:null}
              {hero_image?.button?.label!=''?<Chip mode="outlined" onPress={() => onNext(hero_image)} style={{alignSelf:'center', fontWeight:'bold', backgroundColor:hero_image.button.backgroundColor.value, marginTop: 10 , marginBottom:10, borderColor:hero_image.button.labelColor.value, borderWidth:1, textTransform:'uppercase'}}><Text style={{fontSize:13, fontWeight:'bold', color:hero_image.button.labelColor.value, fontFamily:'Arial',}}>{hero_image?.button?.label}</Text></Chip>:null}
            </View>
          </ImageBackground>
        </View>
    );
  }

  
const styles = StyleSheet.create({
  hero_icon: {
    alignSelf:'center',
    height:60,
    width:60,
    marginTop:15
  },
 });


export default Hero_Image;