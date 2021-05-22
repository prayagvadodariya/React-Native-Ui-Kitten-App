import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme } from 'react-native-paper';
import ContentImage from '../component/ContentImage';
import HTML from "react-native-render-html";

const Simple_Paragraph = (props) => {
  const colors = useTheme(); 
  const simple_paragraph = props.settings; 
   
    return (
      <View>
        <View style={styles.contarea}>
          <View style={styles.innercontarea}>
            <View>
              <Text style={{ fontSize:simple_paragraph.heading.style.fontSize, color:simple_paragraph.heading.style.color.value, fontFamily:"roboto", marginTop:20, marginBottom:5, textAlign:simple_paragraph.heading.style.textAlign}}>{simple_paragraph.heading.text}</Text> 
              <ContentImage/>
            </View>
            <View style={styles.i2}>
              <HTML source={{ html: simple_paragraph.text }}/>
            </View>
          </View>
        </View>
      </View>
    );
  }

  
const styles = StyleSheet.create({
  contarea: {
    borderColor:'#868781',
    borderWidth:3,
    margin:15,
    marginTop:25
  },
  innercontarea: {
    borderColor:'#868781',
    borderWidth:1.5,
    margin:2,
    backgroundColor:"#fff"
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


export default Simple_Paragraph;