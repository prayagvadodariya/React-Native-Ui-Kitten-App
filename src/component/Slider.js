import React, { Component, useState } from 'react';
import { View, Image, SafeAreaView, StyleSheet, ImageBackground,TouchableOpacity, Text, Dimensions } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Paragraph, useTheme } from 'react-native-paper';
import ContentImage from '../component/ContentImage';
import HTML from "react-native-render-html";
import ImageSlider from 'react-native-image-slider';

const Slider = (props) => {
  const colors = useTheme(); 
  const slider = props.item; 
   
    return (
      <View style={{marginBottom:15}}>
        <SafeAreaView>
        <ImageSlider
          loopBothSides={true}
          images={slider.content}
          extraData={colors}
          customSlide={({ index, item, style, width }) => (
            
          <View key={index}>  
            <View style={styles.top}>
              <ImageBackground source={{uri: item.image.url}} resizeMode='stretch' style={{height: "100%", width:'100%'}}></ImageBackground>
            </View>    
          </View>
          )}
        />
        </SafeAreaView> 
      </View> 
    );
  }

  
const styles = StyleSheet.create({
  top: {
    width: Dimensions.get('screen').width /1,
    height: 240,
    // margin: 15,
  },
 });


export default Slider;