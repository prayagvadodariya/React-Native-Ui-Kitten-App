import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constant/StaticData';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import Empty_Show from '../component/Empty_Show';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/wishlistItemAction';
import { Searchbar, Chip, useTheme } from 'react-native-paper';

const Wishlist = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const  colors  = useTheme();

// console.log('wishlistdata',props.wishlist);



const DeleteItem = (index) =>{
  // console.log("delete",index);
  props.removeItemAction(index);
}

    return (
        <View style={{flex:1, backgroundColor:colors.colors.background}}> 
                  {props.wishlist.data.length!=0 ? 
                  <FlatList  horizontal={false}
                    data={props.wishlist.data}   
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item, index}) => 
                      <View style={styles.lay}>
                      <TouchableOpacity style={styles.top}> 
                        <Image source={{ uri: item.Image }} resizeMode='stretch' style={{ width: "100%" , height: "100%", borderRadius:10, overflow:'hidden'}} /> 
                      </TouchableOpacity>
                      <View style={styles.inlay}>
                      <Text style={styles.itemtitle}>{item.title}</Text> 
                      <Text style={styles.itemtitle1}>${item.amount}</Text>
                      </View>
                      <TouchableOpacity style={styles.icon} onPress={() => DeleteItem(index)}>
                        <AntDesign  name="delete" color='red' size={21}/>
                      </TouchableOpacity>
                      </View>
                      
                    }
                  /> : null
                  } 

                <View style={{flex:1}}>
                  {props.wishlist.data.length===0 ?
                    <Empty_Show>YOUR WISHLIST IS EMPTY !!!</Empty_Show>: null
                  }
                </View>
        </View>
    );
  }



const styles = StyleSheet.create({
    top: {
      width: 95,
      height: 100,
      borderRadius:10,
      margin: 10, 
    },
    lay: {
      flexDirection:"row",
      margin:10,
      marginTop: 10,
      borderRadius:10,
      backgroundColor:"#fff",

    },
    inlay: {
      flexDirection:"column"
    },
    itemtitle: {
      marginTop:35,
      color:"#000000",
      fontSize:15,
      fontWeight:"bold",  

    },
    itemtitle1: {
      marginTop:5,
      color:"gray"
    }, 
    icon:{
    flex:1,
    alignItems:"flex-end",
    marginRight:20,
    marginTop:50
    }
  });


  const mapStateToProps = (state) => ({
    wishlist: state.wishlistItemReducer,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    removeItemAction: (Id) => dispatch(removeItemAction(Id)),
  }); 

    export default connect(mapStateToProps,mapDispatchToProps) (Wishlist);

 