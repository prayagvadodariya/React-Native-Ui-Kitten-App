import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

const Gift_Card = (props) => {
  const  colors  = useTheme();
  const gift_card = props.settings; 

  const navigation = useNavigation();
    return (
        <View style={{flex:1, backgroundColor: colors.colors.background}}>
          <View style={styles.hero}><Image resizeMode='stretch' style={{height: "100%", width:'100%'}} source={require('../assets/images/6.jpg')}/></View>
          <View style={{flex:1, flexDirection:"row", justifyContent:"center", backgroundColor:'rgba(255, 255, 255, 1)'}}>
              <View style={styles.cover1}>
                {gift_card?.heading?.text!=''?<Text style={styles.covertext}>{gift_card.heading.text}</Text>:null} 
                {gift_card?.button?.label!=''?<Chip mode="outlined" onPress={() => navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: gift_card.button.link.param.handle },})} style={{alignSelf:'center',fontWeight:'bold',backgroundColor:gift_card.button.backgroundColor.value, marginTop: 10 ,marginBottom:10,borderColor:'#29110d',borderWidth:1}}><Text style={{fontSize:13, fontWeight:'bold',color:gift_card.button.labelColor.value,fontFamily:'Arial'}}>{gift_card.button.label}</Text></Chip>:null}
              </View>
              <View style={styles.cover2}>
                <Image  resizeMode='stretch' style={{height: "100%", width: "100%"}} source={{ uri: gift_card.image.url }}/>
              </View>   
          </View>
        </View>
    );
  }

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    width: "100%",
    height: 150,
    marginTop:20
   },
   cover1: {
    width:"65%",
    height:150,
    backgroundColor:'#fff'  
  },
  covertext: {
    textAlign:"center",
    marginTop:24,
    fontSize:21,
    paddingLeft:10,
    color:'#29110d',
    fontFamily:'roboto',
  },
  cover2: {
    position: 'relative',
    width:"35%",
    height:150
  },
 });


export default Gift_Card;