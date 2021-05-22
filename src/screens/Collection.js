import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View,Button, TextInput, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Drawer, Switch, Paragraph, useTheme } from 'react-native-paper';
import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import Loader from '../component/Loader';
const defaultimg = 'https://blog.addthiscdn.com/wp-content/uploads/2015/12/08192347/shopify-icon.png'

const Collection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const [isload, loading] = useState(true);
  const [isfirst, first] = useState(20);
  const [collectionList, setData] = useState(null);
  const  colors  = useTheme();


  useEffect(() => {
          client
          .query({
            query: gql`
              query  {
                collections( first: ${isfirst}){
                  pageInfo {
                    hasNextPage
                  }
                  edges {
                    node {
                      handle
                      title
                      image {
                        src
                      }
                    }
                  }
                }
              }
            `
          })
          .then((results) => {
            setData(results.data.collections.edges)
            loading(false);
            // console.log("netdatacheck", results);
          })
          .catch((error) => {
            // console.error(error);
          });  
           
    },[])
   
  
  if(isload===true && !collectionList ){
    return (
      <Loader/>
    )
  }
    return (
      <View style={{ backgroundColor: colors.colors.background }}>          
          <View style={styles.product}>  
            <FlatList  
                numColumns={2}
                keyExtractor={(item, index) => String(index)}
                data={collectionList}  
                renderItem={({item}) => 
              {
              return (
                <TouchableOpacity style={styles.top} onPress={() => navigation.navigate('ProductStack', { screen: 'ProductList', params: { collectionhandel: item.node.handle }, })}> 
                 <ImageBackground source={{uri: item.node.image?.src ||defaultimg }} resizeMode='stretch' style={{height: "100%", width:'100%'}}>
                   <View style={styles.textcontent}>
                     <Text style={styles.t1}>{item.node.title}</Text>
                    </View>    
                  </ImageBackground>
                </TouchableOpacity>)}}
            />  
          </View>    
     </View>
    );
  }


const styles = StyleSheet.create({
  top: {
    position: 'relative',
    width: Dimensions.get('screen').width / 2 - 20,
    height: 160,
    margin:10
   },
  head: {
    fontSize:28,
    fontFamily:'Roboto',
    color:"#1c4252",
    fontWeight:"bold",
    marginTop:10,
    textAlign:'center',
  },
  product: {
    marginTop:20,
    marginBottom:20
  },
  textcontent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  t1: {
    fontSize:23,
    fontWeight:"bold",
    color:"#fff",
  },
  
});

export default Collection;