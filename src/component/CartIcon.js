import * as React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { Appbar, useTheme, Badge } from 'react-native-paper';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'

// import { Badge } from 'react-native-elements';

const CartIcon = (props) => {
  const  colors  = useTheme();
  const navigation = useNavigation();

  let arr = props.cartlist.data
  let sum = arr.reduce(function(a,b){return parseInt(a) + parseInt(b.quantity)},0)


  // console.log('color',props);
  return (
    <View>
      <Appbar.Action icon={ props =><AntDesign style={{ color: colors.colors.text }} name="shoppingcart" {...props} />}
      animated={false}
      onPress={() => navigation.navigate('CartStack')}
      />
      <Badge style={{position:'absolute',top:2, right:4}} onPress={() => navigation.navigate('CartStack')}>{sum}</Badge>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartlist: state.cartItemReducer,
});

export default connect(mapStateToProps,null) (CartIcon);