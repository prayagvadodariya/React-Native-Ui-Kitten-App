import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme } from 'react-native-paper';
import ContentImage from '../component/ContentImage';
import HTML from "react-native-render-html";

const Image_With_Text = (props) => {
  const colors = useTheme(); 
  const image_with_text = props.settings;
   
    return (
        <View style={{backgroundColor: colors.colors.background}}>
          <View style={styles.end}>
            <View>
              {image_with_text?.subHeading.text!=''?<Text style={{ fontSize:image_with_text.heading.style.fontSize, color:image_with_text.heading.style.color.value, fontFamily:"roboto", marginTop:20, marginBottom:5, textAlign:image_with_text.heading.style.textAlign}}>{image_with_text.heading.text}</Text>:null} 
              {image_with_text?.subHeading?.text!=''?<Text style={{fontFamily:'dustWest', color:image_with_text.subHeading.style.color.value, fontSize:image_with_text.subHeading.style.fontSize, textAlign:image_with_text.subHeading.style.textAlign, marginBottom:15}}>{image_with_text.subHeading.text}</Text>:null}
              <ContentImage/>          
            </View>
            <TouchableOpacity style={styles.endimg}><Image resizeMode='stretch' style={{height: "100%", width:'100%'}} source={{ uri: image_with_text.image.url }}/></TouchableOpacity>
            {image_with_text?.text!=''?<View style={styles.i2}><HTML source={{ html: image_with_text.text }}/></View>:null}
          </View> 
        </View>
    );
  }

  
const styles = StyleSheet.create({
  end: {
    marginTop:20,
    backgroundColor:'#fff'
  },
  endimg: {
    width:"100%",
    height:246,
    marginTop:20,
    lineHeight:25
  },
  i2: {
    fontSize:15,
    textAlign:"center",
    marginTop:28,
    marginLeft:15,
    marginRight:15,
    color:'#333232',
    lineHeight:25
  },
 });


export default Image_With_Text;