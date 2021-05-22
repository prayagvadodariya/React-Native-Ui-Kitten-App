import AsyncStorage from '@react-native-async-storage/async-storage';
import { InteractionManager } from 'react-native';
import * as Types from '../constant/CartlistKeys';
import * as StorageKeys from '../constant/StorageKeys';

export const CartStorageAction = () => {

  return async (dispatch) => {
    var itemget = await AsyncStorage.getItem(StorageKeys.USER_DATA);
    const item  = JSON.parse(itemget);
    // console.log('itemgeterok',item);
    if(item!=null){
    dispatch({
      type: Types.LOCAL_STORAGE,
      item
    });
  }
  }
  
}

  export const addItemAction = (cardItem) => {
    return async (dispatch) => {
      dispatch({
        type: Types.ADD_ITEM,
        item: cardItem
      });
    }
  }


  export const removeItemAction = (Id) => {
    return async (dispatch) => {
      dispatch({
        type: Types.REMOVE_ITEM,
        index: Id
      });
    }
  }

  export const editItemAction = (editItem, arrayid) => {
    return async (dispatch) => {
      dispatch({
        type: Types.EDIT_ITEM,
        item: editItem,
        index: arrayid
      })
    }
  }