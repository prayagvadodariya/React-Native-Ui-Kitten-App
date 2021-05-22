import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constant/StaticData';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/cartItemAction';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import Empty_Show from '../component/Empty_Show';
import { Paragraph, Chip, useTheme } from 'react-native-paper';

const Cart = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const  colors  = useTheme();

  // console.log('propsdata',props.cartlist.data);

  let arr = props.cartlist.data
  let sum = arr.reduce(function(a,b){return parseFloat(a) + parseFloat(b.quantity) * b.amount},0)

  // console.log('totalsum',sum);

  const DeleteItem = (index) =>{
    // console.log("delete",index);
    props.removeItemAction(index);
  }

  const PlusItem = (item,index) => {
      var count = parseInt(item.quantity) + 1;
      // console.log('plus',count,item,index);

        const updateItem = {
          id: item.id,
          Image: item.Image,
          title:  item.title,
          amount: item.amount,
          quantity: count.toString()
        }
        props.editItemAction(updateItem,index);

  }

  const MinusItem = (item,index) => {
    if((parseInt(item.quantity))==1){
      const updateItem = {
        id: item.id,
        Image: item.Image,
        title:  item.title,
        amount: item.amount,
        quantity: item.quantity
      }
      props.editItemAction(updateItem,index);
    }else{
      var count = parseInt(item.quantity) - 1;
      const updateItem = {
        id: item.id,
        Image: item.Image,
        title:  item.title,
        amount: item.amount,
        quantity: count.toString()
      }
      props.editItemAction(updateItem,index);
    }

  }

    return (
        <View style={{flex:1, backgroundColor: colors.colors.background}}> 
          {props.cartlist.data.length!=0 ?
            <View> 
                <FlatList  horizontal={false}
                    data={props.cartlist.data}  
                    keyExtractor={(item, index) => String(index)}
                    contentContainerStyle={{flexGrow:1}}
                    renderItem={({item ,index}) => 
                    <View style={styles.lay}>
                        <TouchableOpacity style={styles.top}> 
                          <Image source={{ uri: item.Image }} style={{ width: "100%", height: "100%", borderRadius:10, overflow:'hidden'}} /> 
                        </TouchableOpacity>
                        <View style={styles.inlay}>
                          <View style={{ width:"100%", flexWrap: 'wrap'}}><Text style={styles.itemtitle}>{item.title}</Text></View>
                          <View><Text style={styles.itemtitle1}>${item.amount}</Text></View>  
                        </View>

                        <View style={styles.addbt}>
                          <View>
                            <TouchableOpacity style={styles.icon} onPress={() => DeleteItem(index)}><AntDesign  name="delete" color='red' size={21}/></TouchableOpacity>
                            <View style={styles.btlayout}>
                              <View style={styles.b1}><TouchableOpacity onPress={() => PlusItem(item,index)}><AntDesign style={styles.i1} name="plus" color='gray' size={18}/></TouchableOpacity></View>
                              <Text style={{marginLeft:8}}>{item.quantity}</Text>
                              <View style={styles.b2}><TouchableOpacity onPress={() => MinusItem(item,index)}><AntDesign style={styles.i2} name="minus" color='gray' size={18}/></TouchableOpacity></View>
                            </View>
                          </View>
                        </View>
                    </View>}/> 
                     

                    <View style={{flexDirection:"row", marginTop:20}}>
                      <Text style={{marginLeft:15, color:colors.colors.text, fontSize:18, fontWeight:"bold"}}>Sub Total :</Text>
                      <View style={{alignItems:"flex-end", flex:1}}><Text style={{marginRight:15, color:colors.colors.text, fontSize:18, fontWeight:"bold"}}>${sum}</Text></View>
                    </View>
                    <View>
                        <Text style={styles.itemtitle5}>Shipping, textes, and discounts will be calculated at checkout.</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.checkout}>
                          <View style={styles.cover}>
                              <Text style={styles.cardtext}>CHECKOUT</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
        
            </View> :null}

            <View style={{flex:1}}>
            {props.cartlist.data.length===0 ?
              <Empty_Show>YOUR CART IS EMPTY !!!</Empty_Show>: null}
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
      flex:1,
      flexDirection:"row",
      margin:10,
      marginTop: 10,
      backgroundColor:"#e7e4e4",
    },
    inlay: {
      flexDirection:"column"
    },
    itemtitle: {
      width:"100%",
      marginTop:30, 
      color:"#000000",
      fontSize:15,
      fontWeight:"bold",  
      flexWrap:'wrap'
    },
    itemtitle1: {
      color:"#000000",
      fontSize:15,
      fontWeight:"bold",  
    },
    itemtitle2: {
      fontSize:15,  
      color:"gray"
    }, 
    itemtitle5: {
      marginTop:10,
      marginRight:15,
      marginLeft:15,
      color:"#6a6c64",
      fontSize:18, 
    },
    cover: {
      flex:1,
      flexDirection:"row",
      justifyContent:"center"
    },
    icon:{
      flex:1,
      alignItems:"flex-end",
      marginRight:17,
      marginTop:10
    },
    b1:{
      flex:1,
      alignItems:"flex-start"
    },
    i1: {
      margin:3,
    },
    b2:{
      flex:1,
      alignItems:'flex-end'
    },
    i2: {
      margin:3,
    },
    addbt: {
      flex:1,
      alignItems:"flex-end",    
      flexDirection:'column'
    },
    btlayout: {
      marginRight:15,
      width:25,
      height:75,
      margin:5,
      borderRadius:21,
      backgroundColor:'#fff'
    },
    checkout: {
      borderRadius:25,
      borderColor:"#5e290e",
      borderWidth:1.5,
      width: Dimensions.get('screen').width /1 - 20,
      height:45,
      margin: 10,
      marginTop:25,
      // alignItems:"center",
      backgroundColor:"#e7e4e4"
    },
    cover: {
      flex:1,
      justifyContent:"center"
    },
    cardtext: {
    textAlign:'center',
     color:"#3b2322",
     fontWeight:"bold"
    }
  });

const mapStateToProps = (state) => ({
  cartlist: state.cartItemReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemAction: (Id) => dispatch(removeItemAction(Id)),
  editItemAction: (updateItem, index) => dispatch(editItemAction(updateItem, index)),
});

export default connect(mapStateToProps,mapDispatchToProps) (Cart);