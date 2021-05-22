import { from } from '@apollo/client';
import React, {useState,useEffect, Component} from 'react';
import { connect } from 'react-redux';
import { CartStorageAction } from '../actions/cartItemAction';
import { WishlistStorageAction } from '../actions/wishlistItemAction';
import { UserStorageAction } from '../actions/userAction';


const InitialLoadData = (props) => {
  useEffect(() => {
    props.CartStorageAction()
    props.WishlistStorageAction()
    props.UserStorageAction()
    // console.log('chackinitialdata')
    },[])
    return null
}
  
const mapDispatchToProps = (dispatch) => ({
  CartStorageAction: () => dispatch(CartStorageAction()),
  WishlistStorageAction: () => dispatch(WishlistStorageAction()),
  UserStorageAction: () => dispatch(UserStorageAction()),
});

export default connect(null, mapDispatchToProps) (InitialLoadData);