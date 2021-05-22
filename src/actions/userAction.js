import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Types from '../constant/UserKeys';
import * as StorageKeys from '../constant/StorageKeys';

export const UserStorageAction = () => {

  return async (dispatch) => {
    var itemget = await AsyncStorage.getItem(StorageKeys.USER_ACTIVE);
    const item  = JSON.parse(itemget);
    if(item!=null){
    dispatch({
      type: Types.USER_STORAGE,
      item
    });
  }
  }
  
}

export const addItemAction = (cardItem) => {
    return async (dispatch) => {
      dispatch({
        type: Types.ADD_ITEM2,
        item: cardItem
      });
    }
  }


  export const removeItemAction = (Id) => {
    return async (dispatch) => {
      dispatch({
        type: Types.REMOVE_ITEM2,
        index: Id
      });
    }
  }