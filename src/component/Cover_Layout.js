import { DrawerItemList } from '@react-navigation/drawer';
import React, {useState, Component } from 'react';
import { View, Image, StyleSheet, ImageBackground,Dimensions,FlatList, Text } from 'react-native';
import { Chip, Paragraph, useTheme } from 'react-native-paper';
import HTML from "react-native-render-html";

const Cover_Layout = (props) => {
  const custom_content = props.item;
  const content = [];

  const onNext = async (val) => {
    navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: val.button.link.param.handle },})
  }

  custom_content.content.map( (item,key) => {
    switch(item.type) {
      case 'image':

        return content.push(
          <View style={styles.cover}  key={item,key}>
            <Image resizeMode="contain" style={{marginBottom: item.content.extraStyle.marginBottom, marginLeft: item.content.extraStyle.marginLeft, marginRight: item.content.extraStyle.marginRight, marginTop: item.content.extraStyle.marginTop, paddingBottom: item.content.extraStyle.paddingBottom, paddingLeft: item.content.extraStyle.paddingLeft, paddingRight: item.content.extraStyle.paddingRight, paddingTop: item.content.extraStyle.paddingTop, width: "100%", height:100 }}  source={{ uri: item.content.image.url}}/>
          </View> 
        )
      
      case 'text':
        return content.push(
          <View  key={key} style={styles.btext}>
            <View style={{marginLeft:15,marginRight:15}}><HTML source={{ html: item.content.text }}/></View>
          </View>
        )  
    
    }})
  
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%', width: '100%'}}>
          {content}
        </View>
        <View>
        {custom_content.settings?.button?.label!=""?<Chip mode="outlined" onPress={() => onNext(custom_content)} style={{alignSelf:'center', fontWeight:'bold', backgroundColor:custom_content?.button?.backgroundColor?.value, marginTop: 20 , marginBottom:10, borderColor:'#29110d', borderWidth:1}}><Text style={{fontSize:13, fontWeight:'bold', color:custom_content?.button?.labelColor?.value, fontFamily:'Arial',}}>{custom_content?.button?.label}</Text></Chip>:null}
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  cover: {
    flex:1,
    flexDirection:'row',
    marginTop:10,
    width: "100%",
  },
  btext: {
    marginTop: 30,
    marginBottom: 10,
    fontFamily: "about",
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    color: "#6A6C64",
    textAlign: "center",
    width: '100%'
  }
  });

export default Cover_Layout;