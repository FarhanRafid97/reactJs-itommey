import { Action } from '../types/action';
import { ActionType } from '../types/actionType';

export interface ProductType {
  id: number;
  name: string;
  qty: number;
  picture: string;
  isActive?: boolean;
  expiredAt: string;
  createdAt?: string;
  updatedAt?: string;
}

const productReducers = (state: ProductType[] = [], action: Action) => {
  switch (action.type) {
    case ActionType.GET_PRODUCT:
      console.log(action.payload);
      return action.payload;
    case ActionType.ADD_PRODUCT:
      return [...state, action.payload];
    case ActionType.UPDATE_PRODUCT:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload : data
      );
    case ActionType.DELETE_PRODUCT:
      return state.filter((data) => data.id !== action.payload.id);
    default:
      return state;
  }
};
export default productReducers;
