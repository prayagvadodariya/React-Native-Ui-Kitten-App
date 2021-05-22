import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme,Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Announcement_Bar = (props) => {
  const colors = useTheme();
  const announcement_bar = props.settings;
  const navigation = useNavigation();
   
    return (
        <View>  
          <View style={{ width:"100%",height:"auto", backgroundColor:announcement_bar.barBackgroundColor.value}}>
                <View style={styles.cover}>
                  <Text style={{flex:1, marginLeft:10, marginRight:5, fontSize:15, alignItems:'center', fontFamily:'ptsans_regular', color:announcement_bar.barTextColor.value}}>{announcement_bar.text}</Text>
                  {announcement_bar?.button?.label!=''?<Chip mode="outlined" onPress={() => navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: announcement_bar?.button?.link?.param?.handle },})} style={{alignItems:'center', marginRight:5,marginLeft:5, fontWeight:'bold', backgroundColor:announcement_bar.button.backgroundColor.value, borderColor:announcement_bar.button.labelColor.value, borderWidth:1}}><Text style={{fontSize:13, fontWeight:'bold', color: announcement_bar.button.labelColor.value, fontFamily:'Arial',}}>{announcement_bar?.button?.label}</Text></Chip>:null}
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
  cover: {
    flex:1,
    marginBottom:10,
    marginTop:10,
    marginLeft:1,
    marginRight:1,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'flex-end'
  },
 });


export default Announcement_Bar;