import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { Drawer, Switch, Paragraph, useTheme } from 'react-native-paper';
import { PreferencesContext } from '../constant/PreferencesContext';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import * as Services  from '../services/services_hendler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from '../constant/StorageKeys';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import { removeItemAction } from '../actions/userAction';
import Loader from '../component/Loader';

const Sidemenu =  (props) => {
  const [menu, setMenu] = useState(null);
  const [innermenu, setInnerMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = React.useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isToken, setToken] = useState(null);
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const colors  = useTheme();

  useEffect (() => {
    Services.getSideMenu().then(data => {
     setMenu(data.data);
     setLoading(false);
    //  console.log('data',data);    
    })
    
  },[])


  const itemRender = (item, key) => {
    var length  = item.subMenu.length;
    if(length===0){
      return (
        <View key={key}>
          <Drawer.Item
          label={item.title}
          active={active === item.title}
          onPress={() => onItem(item,key)}
          />
        </View> 
      )
    }else{
    
      return (
        <View key={key}>
          <Drawer.Item
            label={item.title}
            active={active === item.title}
            onPress={() => onSubItem(item,key)}
          />

          {isVisible ?
            <View>
              {innermenu.subMenu.map((item, index) => subitemRender(item, index))}
            </View>
          :null}

        </View>
      )
    }
  }  

  const onItem = (val,index) => {
    setActive(val.title);

    if(val.title==='Home'){
      props.navigation.navigate("Home")

    }else if(val.title==='Search'){
      props.navigation.navigate("Search")
     
    }else if(val.title==='Account'){
      props.navigation.navigate("UserStack",{ screen: 'User'})

    }else if(val.title==='Wishlist'){
      props.navigation.navigate("Wishlist")
      
    }else if(val.title==='Cart'){
      props.navigation.navigate("CartStack");

    }else if(val.title==='Orders'){

    }
    // console.log("itemonly",val);
  }

  const onSubItem = (val,index) => {
    val.subMenu.map((item, index) => subitemRender(item, index))
    setInnerMenu(val)
    setIsVisible(!isVisible);
    // console.log("itemsubmenu",val);
  }

  const subitemRender = (item,key) => {
    return (
      <View key={key}>
        <Drawer.Item
          label={item.title}
          active={active === item.title}
          onPress={() => onShopBy(item,key)}
          style={{marginLeft:20}}
        />
      </View>
    )
  }
 
  const onShopBy = (val,index) => {
    setActive(val.title);
    if(innermenu.title==='Shop By'){
      props.navigation.navigate("ProductStack",{ screen: 'ProductList', params: { collectionhandel: val.link.param.handle },})
    }
  }

  (async()=>{
    const accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
    var customerAccessToken = JSON.parse(accessTokenGet);
    setToken(customerAccessToken);
  
  })();
  

  // console.log('checktoken',isToken);
   
  const shareFacebook = async () => {
    await WebBrowser.openBrowserAsync('https://www.facebook.com/');
    props.navigation.closeDrawer()
  }

  const shareInstagram = async () => {
    await WebBrowser.openBrowserAsync('https://www.instagram.com/');
    props.navigation.closeDrawer()
  }

  const sharePinterest = async () => {
    await WebBrowser.openBrowserAsync('https://www.pinterest.com/shopify/');
    props.navigation.closeDrawer()
  }

  const onLogin = () => {
    setActive("Login")
    props.navigation.navigate('LoginStack')
  }

  const onLogout = () => {
    Alert.alert(
      "LOGOUT",
      "Are you sure, you want to logout ?",
      [
        { text: "YES", onPress: () => {
          AsyncStorage.removeItem(StorageKeys.V_AccessToken)
          props.navigation.closeDrawer();
          var index = 0;
          props.removeItemAction(index);
          setToken(null)} 
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
    setActive("Logout")
  }

  if(loading===true && !menu){
   
    return (
    <Loader/>
    )
  }

  return (
    <View style={[styles.drawerContent, { backgroundColor: colors.colors.surface }]}>
      <View>
        <Text style={styles.sectionHeadingStyle1}>Test Dev</Text>
        <Text style={styles.sectionHeadingStyle2}>testdev301@gmail.com</Text>
      </View>
   
     
      <ScrollView>
        <Drawer.Section>

          {menu.map((item, index) => itemRender(item, index))}
          
          {!isToken ?(
          <Drawer.Item
            label="Login"
            active={active === 'Login'}
            onPress={() => onLogin()}
          />): (
          <Drawer.Item
            label="Logout"
            active={active === 'Logout'}
            onPress={() => onLogout()}
          />)}
          <View style={styles.row}>
            <Paragraph>Theming</Paragraph>
            <Switch  value={isThemeDark} onValueChange={toggleTheme} />
          </View>
        
        </Drawer.Section>
      </ScrollView>

      <View style={styles.footerContainer}>
          <Text style={{fontSize:15, fontWeight:'bold', color: 'gray'}}>Let's get social</Text>
          <View style={styles.sharing}>
              <TouchableOpacity style={{ borderRadius:35, width:35, height:35, marginTop:5, marginBottom:10, marginRight:10, alignItems:"center", backgroundColor:colors.colors.text}} onPress={() => shareFacebook()}>
                <View style={styles.shearicon}><FontAwesome name="facebook" color={colors.colors.surface} size={20} /></View>
              </TouchableOpacity>

              <TouchableOpacity style={{ borderRadius:35, width:35, height:35, marginTop:5, marginBottom:10, marginRight:10, alignItems:"center", backgroundColor:colors.colors.text}} onPress={() => shareInstagram()}>
                <View style={styles.shearicon}><AntDesign name="instagram" color={colors.colors.surface} size={18}/></View>
              </TouchableOpacity>
              
              <TouchableOpacity style={{ borderRadius:35, width:35, height:35, marginTop:5, marginBottom:10, marginRight:10, alignItems:"center", backgroundColor:colors.colors.text}} onPress={() => sharePinterest()}>
                <View style={styles.shearicon}><Entypo name="pinterest" color={colors.colors.surface} size={18}/></View>
              </TouchableOpacity>
          </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  sectionHeadingStyle1: {
    marginTop:3,
    marginLeft:15,
    fontSize:23,
    color: 'gray',
    fontWeight: 'bold'
  },
  sectionHeadingStyle2: {
    marginTop:3,
    marginLeft:15,
    fontSize:17,
    marginBottom:10,
    color: 'gray',
  },
  footerContainer: {
    padding: 20,
 },
  sharing: {
    flexDirection:"row"
 },
  share: {
    borderRadius:35,
    width:35,
    height:35,
    marginTop:5,
    marginBottom:10,
    marginRight:10,
    alignItems:"center",
    backgroundColor:"#5e290e"
 },
  shearicon:{
    flex:1,
    justifyContent:'center'
 },
  textsocial:{
    fontSize:15,
    fontWeight:'bold',
    color: '#1c4252'
  } 
});

const mapStateToProps = (state) => ({
  userActive: state.userItemReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemAction: (Id) => dispatch(removeItemAction(Id)),

}); 

export default connect(mapStateToProps,mapDispatchToProps) (Sidemenu);