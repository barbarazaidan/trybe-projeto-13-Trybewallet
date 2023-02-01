import { combineReducers } from 'redux';
import userReduce from './user';
import walletReduce from './wallet';

const rootReducer = combineReducers({ user: userReduce, wallet: walletReduce });

console.log(rootReducer);

export default rootReducer;
