import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

 const ContentText = (props) => {
 const  colors  = useTheme();   
  return (
    <View>
      <Text style={{ fontSize:35, fontFamily:"roboto", color: colors.colors.text, marginTop:20, marginBottom:5, textAlign:"center"}}>{props.children}</Text> 
    </View>
  );
}



export default ContentText;
