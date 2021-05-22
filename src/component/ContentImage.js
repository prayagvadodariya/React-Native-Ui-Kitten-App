import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

 const ContentItem = (props) => {
  
  return (
    <View>
      <Image resizeMode="contain" style={styles.image} source={require('../assets/images/2.png')}/> 
    </View>
  );
}

const styles = StyleSheet.create({
 image: {
    width:"100%",
    height:20,
    marginTop:5,
    marginBottom:10
   },
});

export default ContentItem;
