import { AnyAction, combineReducers, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import productReducer, { ProductStateType } from './product';

const reducers = combineReducers({ products: productReducer });

export default reducers;

export type State = ReturnType<typeof reducers>;
export type AppDispatch = Dispatch<AnyAction> &
  ThunkDispatch<State, null, AnyAction>;
