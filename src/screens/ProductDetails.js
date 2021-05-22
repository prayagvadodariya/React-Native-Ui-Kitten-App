import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Paragraph, Chip, useTheme } from 'react-native-paper';
import * as graph_ql from '../graph_ql/Queries';
import ImageSlider from 'react-native-image-slider';
import * as StaticData from '../constant/StaticData';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';
import { connect } from 'react-redux';
import HTML from "react-native-render-html";
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/cartItemAction';
import Loader from '../component/Loader';
import * as WebBrowser from 'expo-web-browser';
import { Switch } from 'react-native';

const image = { uri: "https://reactjs.org/logo-og.png" };

const ProductDetails = (props) => {
  const product_option = [];
  const [isvar, setvar] = useState(props.route.params.Producthandel);
  const [isVisible, setIsVisible] = useState(false);
  const [isload, loading] = useState(true);
  const [Productdata, setData] = useState(null);
  const [isfirst, first] = useState(10);
  const [isdisable, disable] = useState(true);
  const [isamount, setAmount] = useState(true);
  const [isaddtocart, setAddToCart] = useState(null);
  const  colors  = useTheme();

  // console.log("product details",props.route.params.Producthandel);

  const toggleFunction = () => {
    setIsVisible(!isVisible);
  };

  const shareFacebook = async () => {
    await WebBrowser.openBrowserAsync('https://www.facebook.com/');
  }

  const shareInstagram = async () => {
    await WebBrowser.openBrowserAsync('https://www.instagram.com/');
  }

  const sharePinterest = async () => {
    await WebBrowser.openBrowserAsync('https://www.pinterest.com/shopify/');
  }


  useEffect(() => {
    let handle = props.route.params.Producthandel;
    let fitsts = isfirst;
    
    graph_ql.product_details(handle, fitsts).then(results => {
      setAddToCart(results.data.productByHandle.variants.edges[0].node)
      setData(results.data.productByHandle)
      loading(false);
      disable(results.data.productByHandle.variants.edges[0].node.available)
      // console.log("netdatacheck", results);
    })
    .catch((error) => {
      // console.error(error);
    });  
     
},[props.route.params.Producthandel])


if(Productdata!=null){
  Productdata.options.map( (item,key) => {
  switch(item.name){
    case 'Size':
     return product_option.push(
       <View key={key}>
          <View>
            <Text style={{ fontSize:25, marginTop:10, marginLeft:10, fontWeight:"bold", color:colors.colors.text}}>{item.name}</Text>
          </View>

          <View style={{flexDirection: "row",flexWrap: "wrap",}}>

            {item.values.map((item) => (           
              <TouchableOpacity key={item} onPress={() => sizeSelect(item)}
                style ={{ padding: 8,
                          borderRadius: 1,
                          alignSelf: "flex-start",
                          marginTop:10,
                          marginLeft:10,
                          marginBottom: 10,
                          borderColor:"#3b2322",
                          borderWidth:1,
                          backgroundColor: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#3b2322' : '#ffffff' }}>
   
                <Text style={{ fontSize: 12, fontWeight: "500", color: "coral", color: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#fff' : '#000000'}}>{item}</Text>
              </TouchableOpacity>
            ))}      
          </View> 
       </View>     
     )
     
    case 'Color':
     return product_option.push(
      <View key={key}>
          <View>
            <Text style={{ fontSize:25, marginTop:10, marginLeft:10, fontWeight:"bold", color:colors.colors.text}}>{item.name}</Text>
          </View>

          <View style={{flexDirection: "row",flexWrap: "wrap",}}>

            {item.values.map((item) => (           
              <TouchableOpacity key={item} onPress={() => colorSelect(item)}
                style ={{ padding: 8,
                          borderRadius: 1,
                          alignSelf: "flex-start",
                          marginTop:10,
                          marginLeft:10,
                          marginBottom: 10,
                          borderColor:"#3b2322",
                          borderWidth:1,
                          backgroundColor: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#3b2322' : '#ffffff' }}>
   
                <Text style={{ fontSize: 12, fontWeight: "500", color: "coral", color: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#fff' : '#000000'}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
       </View>    
     )  
  }
 })
}
         

const sizeSelect = (val) => {
  let checkactive = "size"

  if(isaddtocart.selectedOptions.length===2){
   const arr = [
     {
      name: "Size",
      value: val.toString()
     },
     {
      name: "Color",
      value: isaddtocart.selectedOptions[1].value
     }
   ]
   selectCall(arr,checkactive);
 
  }else{
   const arr = [
     {
       name: "Size",
       value: val.toString()
     },
   ]
   selectCall(arr,checkactive);
  }
}

const colorSelect = (val) => {
  let checkactive = "color"

 if(isaddtocart.selectedOptions.length===2){
  const arr = [
    {
      name: "Size",
      value: isaddtocart.selectedOptions[0].value
    },
    {
      name: "Color",
      value: val.toString()
    }
  ]
  selectCall(arr,checkactive);

 }else{
  const arr = [
    {
      name: "Color",
      value: val.toString()
    }
  ]
  selectCall(arr,checkactive);
 }
}

const selectCall = (arr) => {
//  console.log('check',arr);
  setAmount(true);
  graph_ql.product_select(arr, isvar).then(results => {
    setAddToCart(results.data.productByHandle.variantBySelectedOptions)
    setAmount(false)
    loading(false);
    // console.log("nextcall", results);
  })
  .catch((error) => {
    // console.error(error);
  });     
}
    
const addToCart = (data) => {
  let check = props.cartlist.findIndex((em) => em.id=== Productdata.id)
    
  if(check!=-1){
    var arrayid = check
    var quantityget = props.cartlist[check]
    var count = parseInt(quantityget.quantity) + 1;
    const updateItem = {
      id: Productdata.id,
      Image: data.images.edges[0].node.src,
      title:  data.title,
      amount: data.variants.edges[0].node.priceV2.amount,
      quantity: count.toString()
    }
    // console.log('inneradd', check, arrayid);
     props.editItemAction(updateItem,arrayid);
  }
  else{
    const cardItem = {
    id: Productdata.id,
    Image: data.images.edges[0].node.src,
    title:  data.title,
    amount: data.variants.edges[0].node.priceV2.amount,
    quantity: "1"
  }
    props.addItemAction(cardItem);
    // console.log('check',check);
 }
}



if(isload===true && !Productdata ){
  return (
    <Loader/>
  )
} 

    return (
     <View style={{ backgroundColor: colors.colors.background }}>
       <ScrollView>
        <View>  
            <Text style={{fontSize:35, fontFamily:"roboto", color:colors.colors.text, margin:10}}>{Productdata.title}</Text>   
        </View>

        <View>
          <SafeAreaView>
          <ImageSlider
            loopBothSides={false}
            images={Productdata.images.edges}
            extraData={colors}
            customSlide={({ index, item, style, width }) => (
            
            <View key={index} style={{ backgroundColor: colors.colors.background }}>  
              <View style={styles.top}>
                  <ImageBackground source={{uri: item.node.src}} resizeMode='stretch' style={{height: "100%", width:'100%'}}>
                    <View style={styles.zoomlayout}>
                    <TouchableOpacity style={{borderRadius:25, borderColor:colors.colors.text, borderWidth:2, width:55, height:45, alignItems:"center", backgroundColor:"transparent"}}>
                        <AntDesign style={styles.icon} name="shrink" color={colors.colors.text} size={25}  />
                    </TouchableOpacity>
                    </View>
                  </ImageBackground>
              </View>    
            </View>)}
          />
          </SafeAreaView> 
          </View> 
            
          <View style={styles.cover}>
            <Text style={{fontSize:25, marginTop:10, marginLeft:10, color:colors.colors.text}}>${isaddtocart.priceV2.amount}</Text>
            <View style={styles.like}>
              <AntDesign  name="hearto" color={colors.colors.text} size={25}  />
            </View>
          </View>

          
          {product_option}    
        
          <View>
            <TouchableOpacity style={isaddtocart.available?styles.enabled:styles.disabled} disabled={!isaddtocart.available} onPress={() => addToCart(Productdata)}>
              <View style={styles.cover2}>
                <Entypo name="shopping-bag" color={isaddtocart.available ? '#3b2322' : '#c9c5c5'} size={18}/>
                <Text style={isaddtocart.available?styles.textenabled:styles.textdisabled}>{isaddtocart.available ? 'ADD TO CART' : 'SOLD OUT'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View>
          <Chip mode="outlined" onPress={() => addToCart()} disabled={!isaddtocart.available} style={isaddtocart.available?styles.enabled:styles.disabled}> <Text style={isaddtocart.available?styles.textenabled:styles.textdisabled}>{isaddtocart.available ? 'ADD TO CART' : 'SOLD OUT'}</Text></Chip>
          </View> */}

          <View style={styles.cover}>
            <Text style={{fontSize:15, marginTop:10, marginLeft:10, fontWeight:'bold', color:colors.colors.text}}>Product Details : </Text>
              <View style={styles.like}>
                <TouchableOpacity >
                  <AntDesign onPress={toggleFunction} name={isVisible===false  ? 'down' : 'up'} color={colors.colors.text} size={15}/>
                </TouchableOpacity>
              </View>
          </View>

          {/* <View>{isVisible ? 
            <View style={styles.details1}><HTML source={{ html: Productdata.descriptionHtml }}/></View>
            : null}
          </View> */}

          <View>{isVisible ? 
            <View><Text style={styles.details1}>{Productdata.description}</Text></View>
            : null}
          </View>


          <View style={styles.sharing}>
            <Text style={{fontSize:25, marginTop:10, marginLeft:10, fontWeight:"bold", color:colors.colors.text}}>SHARE : </Text>
            <TouchableOpacity style={{ borderRadius:25, borderColor:colors.colors.text, borderWidth:1, width:55, height:50, margin:5, alignItems:"center", backgroundColor:"transparent"}} onPress={() => shareFacebook()}>
                <FontAwesome style={styles.shearicon} name="facebook" color={colors.colors.text} size={28}  />
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius:25, borderColor:colors.colors.text, borderWidth:1, width:55, height:50, margin:5, alignItems:"center", backgroundColor:"transparent"}} onPress={() => shareInstagram()}>
                <AntDesign style={styles.shearicon} name="instagram" color={colors.colors.text} size={25}  />
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius:25, borderColor:colors.colors.text, borderWidth:1, width:55, height:50, margin:5, alignItems:"center", backgroundColor:"transparent"}} onPress={() => sharePinterest()}>
                <Entypo style={styles.shearicon} name="pinterest" color={colors.colors.text} size={25}  />
            </TouchableOpacity>
          </View> 

          <View>
             <ContentText>YOU MAY ALSO LIKE THIS</ContentText>
             <ContentImage/>
          </View>

          <View style={styles.product} >  
                <FlatList  horizontal={true}
                    // numColumns={2}
                  data={StaticData.Product_Details_List} 
                  keyExtractor={(item, index) => String(index)} 
                  extraData={colors} 
                  renderItem={({item}) => 
                
                    <TouchableOpacity> 
                     <View style={styles.flat_layout}><Image source={item.Image} resizeMode='stretch' style={{height: "100%", width:'100%'}}/></View>
                        <Text style={{ textAlign:"center", color:colors.colors.text, fontSize:15, fontWeight:"bold"}}>{item.title}</Text> 
                        <View style={styles.cover}>
                          <Text style={{ color: colors.colors.text, marginTop:10, fontSize:15, }}>{item.amount}</Text>
                          <TouchableOpacity>
                             <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color={colors.colors.text} size={15}/>
                          </TouchableOpacity>  
                        </View>
                    </TouchableOpacity>}
                />  
            </View>  
        </ScrollView>
       </View> 
    );
  
}


const styles = StyleSheet.create({
 top: {
  width: Dimensions.get('screen').width /1 - 20,
  height: 390,
  margin: 10,
 },
 t2: {
  fontSize:25,
  fontFamily:"roboto",
  color:"#1c4252",
  marginTop:15,
  margin:15,
  textAlign:"center"  
 },
 cover2: {
  flex:1,
  alignItems:'center',
  flexDirection:'row'
 },
 zoomlayout: {   
  alignItems:"flex-end",
  marginRight: -10,
  marginTop:320
 },
 icon:{
  marginTop:5,
  position:'absolute'
 },
 
 details1: {
  fontSize:15,
  marginLeft:10,
  marginRight:10,
  color:'gray'
 },
 like: {
  flex:1,
  marginTop:10,
  marginEnd:10,
  alignItems:"flex-end"
 },
 enabled: {
  borderRadius:25,
  borderColor:"#5e290e",
  borderWidth:1.5,
  width: Dimensions.get('screen').width /1 - 20,
  height:45,
  margin: 10,
  marginTop:25,
  alignItems:"center",
  backgroundColor:"transparent"
 },
 disabled: {
  borderRadius:25,
  borderColor:"#c9c5c5",
  borderWidth:1.5,
  width: Dimensions.get('screen').width /1 - 20,
  height:45,
  margin: 10,
  marginTop:25,
  alignItems:"center",
 },
 textenabled: {
  marginLeft:10,
  color:"#3b2322",
  fontWeight:"bold"
 },
 textdisabled: {
  marginLeft:10,
  color:"#c9c5c5",
  fontWeight:"bold"
 },
 boxlayout: {
  flexDirection:"row",
 },
 sharing: {
  flexDirection:"row"
 },
 shearicon:{
  marginTop:10,
 },
 flat_layout: {
  width: Dimensions.get('screen').width / 2 - 10,
  height: 250,
  margin: 5,
 },
  cover: {
   flex:1,
   flexDirection:"row",
   justifyContent:"center"
  },
  product: {
   marginTop:20,
   marginBottom:20
  }
});


const mapStateToProps = (state) => ({
  cartlist: state.cartItemReducer.data,
});


const mapDispatchToProps = (dispatch) => ({
  addItemAction: (cardItem) => dispatch(addItemAction(cardItem)),
  editItemAction: (updateItem, arrayid) => dispatch(editItemAction(updateItem, arrayid)),
  // removeItemAction: (Id) => dispatch(removeItemAction(Id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (ProductDetails);