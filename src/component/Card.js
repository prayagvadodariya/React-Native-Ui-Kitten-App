import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme,Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Card = (props) => {
  const colors = useTheme();
  const card = props.settings;
  const navigation = useNavigation();
   
    return (
        <View>
          <View style={styles.buttomlayout}>
            <ImageBackground resizeMode='stretch' style={{height: "100%", width:'100%'}} source={{ uri: card.image.url }}>
                <View style={styles.innerimg}><Image resizeMode='stretch' style={{height: "100%", width:'100%'}} source={card.cardType==='secondary'? require('../assets/images/15.png'): require('../assets/images/17.png')}/></View>
            </ImageBackground>
          </View>    
          <View style={{ width:"100%",height:150, backgroundColor:card.cardType==='secondary'? '#fae0c6':'#29110d'}}>
                <View style={styles.cover}>
                  {card?.heading!=''?<Text style={{width:"50%", fontSize:30, alignSelf:'center', fontFamily:"net", color:card.cardType==='secondary'? '#29110d':'#fae0c6', marginLeft:10, marginRight:10}}>{card.heading}</Text>:null}
                  {card?.buttonLabel!=''?<Chip mode="outlined" onPress={() => navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: card.buttonLink.param.handle },})} style={{alignSelf:'center', fontWeight:'bold', backgroundColor:'transparent', margin:30, borderColor:card.cardType==='secondary'? '#29110d':'#fae0c6', borderWidth:1}}><Text style={{fontSize:13, fontWeight:'bold', color:card.cardType==='secondary'? '#29110d':'#fae0c6', fontFamily:'Arial',}}>{card.buttonLabel}</Text></Chip>:null} 
                </View>
          </View>
        </View>
    );
  }

  
const styles = StyleSheet.create({
  buttomlayout: {
    width:"100%",
    height:180
  },
  innerimg: {
    width:"100%",
    height:30,
    marginTop:168
  },
  cover: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  },
  chiptext: {
    fontSize:13, fontWeight:'bold', color:'rgb(59, 35, 34)', fontFamily:'Arial',
  },
 });


export default Card;