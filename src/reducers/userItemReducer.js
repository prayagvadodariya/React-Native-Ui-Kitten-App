import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Types from '../constant/UserKeys';
import * as StorageKeys from '../constant/StorageKeys';

const INITIAL_STATE =  {
  data: [],
};

const userItemReducer =  (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case Types.USER_STORAGE: {
      AsyncStorage.setItem(StorageKeys.USER_ACTIVE, JSON.stringify([...state.data, action.item]));
      return {
        data: [...state.data, ...action.item]
        }
    }
    case Types.ADD_ITEM2: {
      AsyncStorage.setItem(StorageKeys.USER_ACTIVE, JSON.stringify([...state.data, action.item]));
      return  {
        data: [...state.data, action.item]
      }
    } 
    case Types.REMOVE_ITEM2: {
      state.data.splice(action.index, 1);
      let setdatastore = state.data
      AsyncStorage.setItem(StorageKeys.USER_ACTIVE, JSON.stringify(setdatastore))
      return  {
        data:  state.data
      }
    } 
    
    default:
      return state
  }
};

export default userItemReducer;