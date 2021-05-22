import { combineReducers } from 'redux';
import cartItemReducer from './cartItemReducer'
import wishlistItemReducer from './wishlistItemReducer'
import userItemReducer from './userItemReducer'


const rootReducer = combineReducers({
    cartItemReducer,
    wishlistItemReducer,
    userItemReducer,
});

export default rootReducer

