import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import { Dimensions, StyleSheet, Text, View,Button, TextInput, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as StaticData from '../constant/StaticData';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Searchbar, Chip, useTheme } from 'react-native-paper';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';
// import { SearchBar } from 'react-native-elements';
// import ProductHorizontal from '../component/ProductHorizontal';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const  colors  = useTheme();
    
    return (
      <View style={{backgroundColor:colors.colors.background}}>
        {/* <View style={styles.searchbrlayout}>
          <SearchBar
          containerStyle={{backgroundColor: 'transparent', borderTopColor:'transparent', borderBottomColor:'transparent'}}
          inputContainerStyle= {{backgroundColor:"white", borderRadius:5, margin:-4}}
          inputStyle={{backgroundColor: 'white', fontSize:15}}
          placeholder="Search Product here..."
          style={styles.searchbr}
          // onChangeText={this.updateSearch}
          // value={search}
          />
        </View> */}
        <View>
          <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{margin:15}}
          />
        </View>

        <ScrollView>
          <View>
            <Text style={{fontSize:18, fontFamily:"helvetica", color:colors.colors.text, fontWeight:"bold", marginTop:25, marginLeft:10}}>SHOP BY</Text>
          </View>
          
          <View style={styles.product} >  
              <FlatList  horizontal={true}
                  keyExtractor={(item, index) => String(index)} 
                  data={StaticData.Search_List}  
                  renderItem={({item}) => 
                  <TouchableOpacity style={styles.top}> 
                    <ImageBackground source={item.Image} resizeMode='stretch' style={{height: "100%", width:'100%', borderRadius:10, overflow:'hidden'}}>
                      <View style={styles.textcontent}>
                        <Text style={styles.t1}>{item.title}</Text>
                      </View>
                    </ImageBackground>         
                  </TouchableOpacity>}
              />  
          </View> 

          <View>
            <ContentText>RECENTLY VIEWED</ContentText>
            <ContentImage/> 
          </View>

          <View style={styles.container}>  
            <FlatList  horizontal={true}
                keyExtractor={(item, index) => String(index)} 
                data={StaticData.Product_List}  
                extraData={colors}
                renderItem={({item}) => 
                <View> 
                  <View style={styles.flat_layout}><Image source={item.Image} resizeMode='stretch' style={{height: "100%", width:'100%'}} /></View>
                  <Text style={{ textAlign:"center", color:colors.colors.text, fontSize:15, fontWeight:"bold"}}>{item.title}</Text> 
                  <View style={styles.cover}>
                    <Text style={{ color: colors.colors.text, marginTop:10, fontSize:15, }}>{item.amount}</Text>
                    <TouchableOpacity>
                      <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color={colors.colors.text} size={15} />
                    </TouchableOpacity>  
                  </View>
                </View>}
            />  
          </View>

          <View>
            <ContentText>ACCESSORIES</ContentText>
            <ContentImage/>
          </View>

          <View style={styles.container}>  
            <FlatList  horizontal={true}
                keyExtractor={(item, index) => String(index)} 
                data={StaticData.Product_List_One}  
                extraData={colors}
                renderItem={({item}) => 
                <View> 
                  <View style={styles.flat_layout}><Image source={item.Image} resizeMode='stretch' style={{height: "100%", width:'100%'}}/></View>
                  <Text style={{ textAlign:"center", color:colors.colors.text, fontSize:15, fontWeight:"bold"}}>{item.title}</Text> 
                  <View style={styles.cover}>
                    <Text style={{ color: colors.colors.text, marginTop:10, fontSize:15, }}>{item.amount}</Text>
                    <TouchableOpacity>
                      <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color={colors.colors.text} size={15} />
                    </TouchableOpacity>  
                  </View>
                </View>}
            />  
          </View>

          <Chip mode="outlined" onPress={() => {}} style={styles.chip}><Text style={styles.chiptext}>SELL ALL</Text></Chip>

        </ScrollView>
      </View>
    );
  }


const styles = StyleSheet.create({
  searchbrlayout: {
   margin:5
  },
  top: {
    width: 135, 
    height: 155, 
    marginLeft:10,
    marginRight:5,
    marginTop:10,
    borderRadius:10 
  },
  chip: {
    alignSelf:'center',
    fontWeight:'bold',
    backgroundColor:'#e7e4e4',
    marginTop: 10 ,
    marginBottom:20,
    borderColor:'#29110d',
    borderWidth:1
  },
  chiptext: {
    fontSize:13,
    fontWeight:'bold',
    color:'#29110d',
    fontFamily:'Arial',
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
    fontSize:18,
    fontWeight:"bold",
    color:"#fff",
  },
  t2: {
    fontSize:28,
    fontFamily:"Roboto",
    color:"#1c4252",
    marginTop:15,
    margin:15,
    textAlign:"center"
  },
  flat_layout: {
    width: Dimensions.get('screen').width / 2 - 20,
    height: 250, 
    margin: 10 
  },
  cover: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },

});

export default Search;