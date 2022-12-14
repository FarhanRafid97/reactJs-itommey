import { ActionType, ErrorType, ToastType } from './actionType';
import { ProductType } from './product';

interface GetProductType {
  type: ActionType.GET_PRODUCT;
  payload: {
    toast: ToastType.TOAST_NONE;
    loading: boolean;
    error: string;
    data: ProductType[];
  };
}
interface AddProductType {
  type: ActionType.ADD_PRODUCT;
  payload: {
    toast: ToastType.TOAST_SUCCESS_ADD;
    loading: boolean;
    error: string;
    data: ProductType;
  };
}
interface UpdateProductType {
  type: ActionType.UPDATE_PRODUCT;
  payload: {
    toast: ToastType.TOAST_SUCCESS_UPDATE;
    loading: boolean;
    error: string;
    data: ProductType;
  };
}

interface DeleteProductType {
  type: ActionType.DELETE_PRODUCT;
  payload: {
    toast: ToastType.TOAST_SUCCESS_DELETE;
    loading: boolean;
    error: string;
    data: {
      id: number;
    };
  };
}
interface FailedAddProduct {
  type: ErrorType.FAILED_ACTION;
  payload: {
    toast: ToastType.TOAST_FAILED;
    loading: boolean;
    error: string;
  };
}
interface LoadingDispatch {
  type: 'LOADING_STATE';
  payload: {
    loading: boolean;
  };
}
export type Action =
  | GetProductType
  | AddProductType
  | DeleteProductType
  | UpdateProductType
  | FailedAddProduct
  | LoadingDispatch;
