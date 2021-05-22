import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Chip, Paragraph, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser';
import HTML from "react-native-render-html";

const Image_with_text_overlay = (props) => {
  const colors = useTheme();
  const image_with_text = props.settings;
  const navigation = useNavigation();

  const onLearnMore = async (url) =>{
    await WebBrowser.openBrowserAsync(url);
  }

    return (
        <View style={{position: 'relative', width: "100%", height: 240, backgroundColor: colors.colors.background}}>
          <ImageBackground resizeMode='stretch' style={{height: "100%"}} source={{ uri: image_with_text.image.url }}>
            <View>
              {image_with_text?.text!=''?<View style={styles.setText}><HTML source={{ html: image_with_text.text }}/></View>:null}
              {image_with_text?.button?.label!=''?<Chip mode="outlined" onPress={() => onLearnMore(image_with_text.button.link.param.url)} style={{alignSelf:'center', fontWeight:'bold', backgroundColor:image_with_text.button.backgroundColor.value, marginTop: 10 , marginBottom:10, borderColor:'#29110d', borderWidth:1}}><Text style={{fontSize:13, fontWeight:'bold', color:image_with_text.button.labelColor.value, fontFamily:'Arial',}}>{image_with_text.button.label}</Text></Chip>:null}
            </View>
          </ImageBackground>
        </View>
    );
  }

  
const styles = StyleSheet.create({
  setText: {
    textAlign:"center",
    marginTop:28,
    marginLeft:15,
    marginRight:15,
    lineHeight:25
  },
 });


export default Image_with_text_overlay;