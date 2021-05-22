import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import {  Card, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constant/StaticData';
import Empty_Show from '../component/Empty_Show';
import * as graph_ql from '../graph_ql/Queries';
import * as graph_ql_mutation from '../graph_ql/Mutation';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import Loader from '../component/Loader';

const Address = (props) => {
  // console.log('props',props.route);
  const  colors  = useTheme();
  const navigation = useNavigation();
  const [isload, loading] = useState(true);
  const [isaddress, Address] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    graph_ql.address(props.route.params.first).then(results =>{
      Address(results.data.customer)
      // console.log('address',results);
      loading(false);
    })
   },[props.route])


   const onDelete = (id) =>{
    setAnimating(true);
    graph_ql_mutation.remove_address(id).then(results =>{
      if(results){
        graph_ql.address(props.route.params.first).then(results =>{
          Address(results.data.customer)
          setAnimating(false);
          // console.log('address11',results);
        })
      }
    })
    // console.log("va",id);
   }

  if(isload===true && !isaddress){
    return (
      <Loader/>
    )
  }
    return (
      <View style={{flex:1, backgroundColor:colors.colors.background}}>
        {isaddress.addresses.edges.length!=0 ?
        <FlatList 
            data={isaddress.addresses.edges} 
            keyExtractor={(item, index) => String(index)} 
            renderItem={({item, index}) => 
              <View>
                <View style={styles.cover}>
                  <Text style={{fontSize:18}}>{item.node.firstName}, {item.node.lastName}, {item.node.company}, {item.node.address1}, {item.node.address2}, {item.node.zip}, {item.node.city}</Text>
                </View>
                    
                <View style={styles.cover2}>
                  <View style={{alignItems:'flex-start', flex:1}}>
                    <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('UserStack', { screen: 'Add_Edit_Address',  params: { data: item.node, id: item.node.id, active:false },})}>
                      <View style={{justifyContent:'center', flex:1}}><AntDesign name="edit" color='#3b2322' size={20} /></View>
                    </TouchableOpacity>
                  </View>
                  <View style={{alignItems:'flex-end', flex: 1}}>
                    <TouchableOpacity style={styles.edit1} onPress={() => onDelete(item.node.id)}>
                        <View style={{justifyContent:'center', flex:1}}><AntDesign name="delete" color='#3b2322' size={18} /></View>
                    </TouchableOpacity>
                  </View>    
                </View>  
              </View>}
         />: null}

          <View style={{flex:1}}>
              <ActivityIndicator
                  animating={animating}
                  color="#2196f3"
                  size="large"
                  style={styles.activityIndicator}
              />
          </View>

         <View style={{flex:1}}>
            {isaddress.addresses.edges.length===0 ?
            <Empty_Show>YOUR ADDRESS IS NOT AVAILABLE !!!</Empty_Show>: null}
         </View>

      </View> 
                
    );
  
}


const styles = StyleSheet.create({
  cover: {
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    backgroundColor: '#fff',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:15,
    paddingBottom:15,
    borderColor:'#e2e2e2',
    borderRadius:5, 
    borderWidth:1
  },
  cover2: {
    marginLeft:20,
    marginRight:20,
    flexDirection:'row',
    backgroundColor: '#fff',
    padding:10,
    borderColor:'#e2e2e2',
    borderRadius:5,
    borderWidth:1
  },
 
  edit: {
    marginLeft:50,  
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"#e7e4e4"
  },
  edit1: {
    marginRight:50,
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"#e7e4e4"
  },
  

});

export default Address;