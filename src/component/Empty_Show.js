import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme } from 'react-native-paper';

const Empty_Show = (props) => {
  const  colors  = useTheme(); 
  
    return (
      <View style={{flex:1, justifyContent: "center", alignItems: "center", backgroundColor: colors.colors.background}}>
        <Text style={styles.titleStyle}>{props.children}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    titleStyle:{
      fontFamily:'Roboto',
      textAlign:'center',
      color:'gray',
      fontSize:25,
    }
 });


export default Empty_Show;