import { ActionType } from './actionType';

interface GetProductType {
  type: ActionType.GET_PRODUCT;
  payload: {
    id: number;
    name: string;
    qty: number;
    picture: string;
    expiredAt: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
interface AddProductType {
  type: ActionType.ADD_PRODUCT;
  payload: {
    name: string;
    qty: number;
    picture: string;
    expiredAt: string;
  };
}
interface UpdateProductType {
  type: ActionType.UPDATE_PRODUCT;
  payload: {
    id: number;
    name?: string;
    qty?: number;
    picture?: string;
    expiredAt?: string;
  };
}

interface DeleteProductType {
  type: ActionType.DELETE_PRODUCT;
  payload: {
    id: number;
  };
}
export type Action =
  | GetProductType
  | AddProductType
  | DeleteProductType
  | UpdateProductType;
