import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList,TextInput, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Chip, useTheme } from 'react-native-paper';


const Custom_Model_Button = (props) => {
  const  colors  = useTheme();

    return (
      <TouchableOpacity onPress={props.onPress} style={styles.inputView}>
        <Text style={styles.inputText}>{props.children}</Text>
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

inputView: {
  
  marginTop: 25,
  backgroundColor:"#5e290e",
  borderRadius:30,
  borderColor:'#5e290e',
  borderWidth:1,
  justifyContent:"center",
  padding:15
},
inputText:{
  textAlign:"center",
  color:"#fff"
},

});

export default Custom_Model_Button;