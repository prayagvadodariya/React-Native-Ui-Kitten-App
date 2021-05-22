import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Text } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Paragraph, useTheme } from 'react-native-paper';
import * as graph_ql from '../graph_ql/Queries';
import EmptyShow from '../component/Empty_Show';
import Loader from '../component/Loader';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/wishlistItemAction'

const defaultimg = 'https://blog.addthiscdn.com/wp-content/uploads/2015/12/08192347/shopify-icon.png'
const lenth = 0;

const ProductList = (props) => {
 
  const [isfavorite, setIsFavorite] = useState();
  const [isload, loading] = useState(true);
  const [ProductList, setData] = useState(null);
  const [isfirst, first] = useState(10);
  const navigation = useNavigation();
  const  colors  = useTheme();

  useEffect(() => {
    if(props.wishlist.data.length===0){
      setIsFavorite([])
      // console.log('nullok',props.wishlist.data);
    }else{
      setIsFavorite(props.wishlist.data.map((item) => {return item.id}))
      // console.log('update',props.wishlist.data);
    }
  }, [props.wishlist]);

  useEffect(() => {
    let handle = props.route.params.collectionhandel;
    let fitsts = isfirst;

    graph_ql.product_list(handle, fitsts).then(results => {
      if(results.data.collectionByHandle!=null){
          setData(results.data.collectionByHandle.products.edges)
          loading(false);
          }else
          setData(results.data.collectionByHandle);
          loading(false);
          // console.log("netdatacheck", results);
    })
   
  },[props.route.params.collectionhandel])


const AddToWishlist = (item) => {
  let oldItem = props.wishlist.data.findIndex((em) => em.id=== item.node.id);
  if(isfavorite.indexOf(item.node.id)>-1){    
    props.removeItemAction(oldItem);
  //  console.log('inactivenot', oldItem);
  }else{
    setIsFavorite([...isfavorite, item.node.id])
    const cardItem = {
      id: item.node.id,
      Image: item.node.images.edges[0].node.src,
      title:  item.node.title,
      amount: item.node.variants.edges[0].node.priceV2.amount,
     }
     props.addItemAction(cardItem);
    // console.log('checkactive');
  }
  
 }

  const  emptyComponent= () => {
    return(
        <EmptyShow>PRODUCT IS NOT AVAILABLE AT THE MOMENT</EmptyShow>
    )}

  if(isload===true && !ProductList){
    return (
    <Loader/>
    )
  }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: colors.colors.background}}> 

            <FlatList
                numColumns={2}
                data={ProductList} 
                ListEmptyComponent={emptyComponent}
                style={{flex:1}} 
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{flexGrow:1}}
                extraData={colors}
                renderItem={({item, index}) => 
            { 
            return (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("ProductStack",{ screen: 'ProductDetails', params: { Producthandel: item.node.handle }})}> 
                      <View style={styles.top}><Image source={{ uri: item.node.images.edges[0].node?.src ||defaultimg}} resizeMode='stretch' style={{height: "100%", width:'100%'}}/></View> 
                      <Text style={{paddingRight:10, paddingLeft:10, width: Dimensions.get('screen').width / 2 - 10, margin:5, textAlign:"center", color:colors.colors.text, fontSize:15, fontWeight:"bold" }}>{item.node.title}</Text> 
                  </TouchableOpacity>
                  <View style={styles.cover}>
                      <Text style={{color:colors.colors.text, marginTop:10, fontSize:15, marginBottom:10}}>${item.node.variants.edges[0].node.priceV2.amount}</Text>
                      <TouchableOpacity onPress={() => AddToWishlist(item)}>
                      <AntDesign style={{ marginLeft:10,marginTop:12}} name={isfavorite.indexOf(item.node.id)>-1  ? 'heart' : 'hearto'}  color={colors.colors.text} size={15} />
                      </TouchableOpacity>  
                  </View>
                </View>)}}
            /> 
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
 top: {
   position: 'relative',
   width: Dimensions.get('screen').width / 2 - 10,
   height: 250,
   margin: 5
 }, 
 titleStyle:{
   fontFamily:'Roboto',
   textAlign:'center',
   color:'gray',
   fontSize:25,
 },
 cover: {
  //  flex:1,
   flexDirection:"row",
   justifyContent:"center"
 },

});


  const mapStateToProps = (state) => ({
    wishlist: state.wishlistItemReducer,
  });


  const mapDispatchToProps = (dispatch) => ({
    addItemAction: (cardItem) => dispatch(addItemAction(cardItem)),
    removeItemAction: (Id) => dispatch(removeItemAction(Id)),
  });

 export default connect(mapStateToProps,mapDispatchToProps) (ProductList);
