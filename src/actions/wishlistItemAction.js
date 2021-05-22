import AsyncStorage from '@react-native-async-storage/async-storage';
import { InteractionManager } from 'react-native';
import * as Types from '../constant/WishlistKey';
import * as StorageKeys from '../constant/StorageKeys';

export const WishlistStorageAction = () => {

  return async (dispatch) => {
    var itemget = await AsyncStorage.getItem(StorageKeys.WISHLIST_DATA);
    const item  = JSON.parse(itemget);
    // console.log('itemgeterok',item);
    if(item!=null){
    dispatch({
      type: Types.WISH_LIST_STORE,
      item
    });
   }
  }
  
}

  export const addItemAction = (cardItem) => {
    return async (dispatch) => {
      dispatch({
        type: Types.ADD_ITEM1,
        item: cardItem
      });
    }
  }


  export const removeItemAction = (Id) => {
    return async (dispatch) => {
      dispatch({
        type: Types.REMOVE_ITEM1,
        index: Id
      });
    }
  }

  export const editItemAction = (editItem, arrayid) => {
    return async (dispatch) => {
      dispatch({
        type: Types.EDIT_ITEM1,
        item: editItem,
        index: arrayid
      })
    }
  }