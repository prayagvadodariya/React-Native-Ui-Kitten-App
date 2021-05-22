import React, { useState } from 'react';
import {Button, Image, View, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SideMenu from './src/component/Sidemenu'
import CartIcon from './src/component/CartIcon';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Wishlist from './src/screens/Wishlist';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Collection from './src/screens/Collection';
import ProductList from './src/screens/ProductList';
import ProductDetails from './src/screens/ProductDetails';
import Product_Details from './src/screens/Product_Details';
import Cart from './src/screens/Cart';
import User from './src/screens/User';
import Address from './src/screens/Address';
import Add_Edit_Address from './src/screens/Add_Edit_Address';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from './src/constant/StorageKeys';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { BottomNavigation, Text, Appbar, useTheme } from 'react-native-paper';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const NavigationDrawerStructure = (props) => {
  
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
    return true
  };

 
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Entypo name="menu" color='#3b2322' size={26} style={{ marginLeft: 10}} />
      </TouchableOpacity>
     
    </View>
  );
};



const BackActionButton = (props) => {
  const Back = () => {
    //Props to open/close the drawer
    props.navigationProps.goBack()
    
  };

  return(
    <TouchableOpacity >
        <Ionicons  onPress={() => Back()} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
    </TouchableOpacity>
  )
}



const getHeaderTitle = (route) => {
  
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  // console.log('checkroute',route);
  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Search':
      return 'Search';
    case 'Wishlist':
      return 'Wishlist';    
  }

};


const BottomTabStack = () => {
  const  colors  = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.colors.text,
        style: {
          backgroundColor: colors.colors.surface,
          borderTopWidth: 0
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 12,
          fontFamily:'roboto'
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={22} />)
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'SEARCH',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={color} size={22} />)
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: 'WISHLIST',
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" color={color} size={22} />)
        }}
      />
    </Tab.Navigator>
  );
};


const HomeScreenStack =  ({navigation},props) => {
  const [isToken, setToken] = useState(null);
  const  colors  = useTheme();
  (async()=>{
    const accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
    var customerAccessToken = JSON.parse(accessTokenGet);
    setToken(customerAccessToken);
  
  })();
  
  return (
    <Stack.Navigator 
    initialRouteName="Home"
    headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous,style }) => (
          <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
            <Appbar.Action
              icon={ props => <Entypo name='menu' {...props} color={colors.colors.text}/>}
              animated={false}
              onPress={() =>
                navigation.toggleDrawer()
              }
            />
            <Appbar.Content title={<Text style={{fontSize:20,fontFamily:'roboto'}}>HEELS N SPURS</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
            <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>} 
              animated={false}
              onPress={()=>{
                navigation.navigate('UserStack',{ screen: 'User'})
              }  
              }
            />
            <CartIcon/>
          </Appbar.Header>
        ),
      }}>
      <Stack.Screen
        name="BottomTabtack"
        component={BottomTabStack}
      />
    </Stack.Navigator>
  );
};

const ProductStack = ({navigation, route}) => {
  // console.log('props', route);
  const  colors  = useTheme();
  return (
    <Stack.Navigator 
    headerMode="screen"
    >
    {/* <Stack.Screen
      name="Collection"
      component={Collection}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
          icon={ props => <Entypo name='menu' {...props} color={colors.colors.text}/>}
          onPress={() =>
          navigation.toggleDrawer()
          }
        />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>COLLECTIONS</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
          <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>}/>
          <CartIcon/>
        </Appbar.Header>
          ),
        }}
      /> */}
      <Stack.Screen
      name="ProductList"
      component={ProductList}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
          icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
          animated={false}
          onPress={() =>
          navigation.goBack()
          }
        />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>PRODUCT LIST</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
          <Appbar.Action icon={ props => <AntDesign name='menu-unfold' {...props} color={colors.colors.text}/>}  animated={false}/>
        </Appbar.Header>
          ),
        }}
      />
      <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
          icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
          animated={false}
          onPress={() =>
          navigation.goBack()
          }
        />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>PRODUCT DETAILS</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
          <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>}
            animated={false}
            onPress={()=>
              navigation.navigate('UserStack',{ screen: 'User'})
            }
          />
          <CartIcon/>
        </Appbar.Header>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProductDetailsStack = ({navigation, route}) => {
  const  colors  = useTheme();
  return (
    <Stack.Navigator 
    headerMode="screen"
    >
    <Stack.Screen
    name="ProductDetails"
    component={Product_Details}
    options={{
    header: ({ navigation, scene, previous,style }) => (
    <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
      <Appbar.Action
        icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
        animated={false}
        onPress={() =>
        navigation.goBack()
        }
      />
      <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>PRODUCT DETAILS</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
      <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>}
      animated={false}
      onPress={()=>
      navigation.navigate('UserStack',{ screen: 'User'})
      }
      />
      <CartIcon/>
      </Appbar.Header>
      ),
      }}
      />
    </Stack.Navigator>
  );
};

const UserStack = ({navigation}) => {
  const  colors  = useTheme();
  return (
    <Stack.Navigator 
    headerMode="screen"
    >
      <Stack.Screen
      name="User"
      component={User}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
          icon={ props => <Entypo name='menu' {...props} color={colors.colors.text}/>}
          animated={false}
          onPress={() =>
          navigation.toggleDrawer()
          }
        />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>USER ACCOUNT</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
          <CartIcon/>
        </Appbar.Header>
          ),
        }}
      />
      <Stack.Screen
      name="Address"
      component={Address}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
            icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
            animated={false}
            onPress={() =>
            navigation.goBack()
            }
          />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>YOUR ADDRESSES</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
         <Appbar.Action icon={ props => <AntDesign name='plus' {...props} color={colors.colors.text}/>}
            animated={false}
            onPress={() =>
            navigation.navigate('UserStack', { screen: 'Add_Edit_Address',params: { active:true }})
            }
         />
        </Appbar.Header>
          ),
        }}
      />
      <Stack.Screen
      name="Add_Edit_Address"
      component={Add_Edit_Address}
      options={{
      title: 'add & edit address',  
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
            icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
            animated={false}
            onPress={() =>
              navigation.goBack()
            }
          />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>{scene.descriptor.options.title}</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
        <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>} animated={false}/>
        <CartIcon/>
        </Appbar.Header>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const LoginStack = ({navigation}) => {
  const  colors  = useTheme();
  return (
    <Stack.Navigator 
    headerMode="screen"
    initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ 
          headerLeft: () => (
          <TouchableOpacity >
            <Ionicons  onPress={() => navigation.goBack()} name="chevron-back" color={colors.colors.text} size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
        ),  
        headerRight: false, headerTitle: false, headerStyle: false, headerTransparent: true}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ 
          headerLeft: () => (
            <TouchableOpacity >
                <Ionicons  onPress={() => navigation.navigate('LoginStack', { screen: 'Login' })} name="chevron-back" color={colors.colors.text} size={26} style={{ marginLeft: 10}} />
            </TouchableOpacity>
        ), 
        headerRight: false, headerTitle: false, headerStyle: false, headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

const CartStack = ({navigation}) => {
  const  colors  = useTheme();
  return (
    <Stack.Navigator 
    headerMode="screen"
    initialRouteName="Cart"
    >
      <Stack.Screen
      name="Cart"
      component={Cart}
      options={{
      header: ({ navigation, scene, previous,style }) => (
      <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
        <Appbar.Action
          icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
          animated={false}
          onPress={() =>
          navigation.goBack()
          }
        />
        <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>CART</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
          <Appbar.Action icon={ props => <AntDesign name='user' {...props} color={colors.colors.text}/>}
            animated={false}
            onPress={()=>
              navigation.navigate('UserStack',{ screen: 'User'})
            }
          />
          <CartIcon/>
        </Appbar.Header>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
    return (
      <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="HomeScreenStack"
      drawerContent={(props) => <SideMenu {...props}/>}
        >
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home'}}
          component={HomeScreenStack}
        />
         <Drawer.Screen
          name="ProductStack"
          options={{drawerLabel: 'ProductStack'}}
          component={ProductStack}
         />
         <Drawer.Screen
         name="ProductDetailsStack"
         options={{drawerLabel: 'ProductDetailsStack'}}
         component={ProductDetailsStack}
         />
         <Drawer.Screen
          name="UserStack"
          options={{drawerLabel: 'UserStack'}}
          component={UserStack}         
         />
         <Drawer.Screen
          name="LoginStack"
          options={{drawerLabel: 'LoginStack'}}
          component={LoginStack}
         />
         <Drawer.Screen
          name="CartStack"
          options={{drawerLabel: 'CartStack'}}
          component={CartStack}
         />  
      </Drawer.Navigator>
    </NavigationContainer>
    );
  };
export default Router;