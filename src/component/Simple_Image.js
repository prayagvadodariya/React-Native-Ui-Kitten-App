import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Chip, Paragraph, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser';
import HTML from "react-native-render-html";

const Simple_Image = (props) => {
  const colors = useTheme();
  const simple_image = props.settings;
  const navigation = useNavigation();

 
    return (
      <View style={{position: 'relative', width: simple_image.extraStyle.width, marginBottom: 15, marginLeft: simple_image.extraStyle.marginLeft, marginRight: simple_image.extraStyle.marginRight, marginTop: simple_image.extraStyle.marginTop, paddingBottom: simple_image.extraStyle.marginBottom, paddingLeft: simple_image.extraStyle.paddingLeft, paddingRight: simple_image.extraStyle.paddingRight, paddingTop: simple_image.extraStyle.paddingTop, height: 240, backgroundColor: colors.colors.surface}}>
        {simple_image?.image?.url!=''?<Image resizeMode='stretch' style={{height: "100%"}} source={{ uri: simple_image.image.url }}/>:null}
      </View>
    );
  }

  
const styles = StyleSheet.create({

 });


export default Simple_Image;
