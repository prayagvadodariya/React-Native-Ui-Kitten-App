import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList,TextInput, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Chip, useTheme } from 'react-native-paper';


const Custom_Button = (props) => {
 const  colors  = useTheme();    
    return (
      <TouchableOpacity onPress={props.onPress} style={{flex:1, marginTop: 25, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:30, marginBottom:20, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:15}}>
        <Text style={{textAlign:"center", color:colors.colors.surface}}>{props.children}</Text>
      </TouchableOpacity>
    );
  
}


export default Custom_Button;