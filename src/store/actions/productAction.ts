import { Dispatch } from 'redux';
import { UpdateInputType } from '../../components/UpdateProductModal';
import {
  createProduct,
  fetchProduct,
  removeProduct,
  updateProduct,
} from '../api/product';
import { Action } from '../types/action';
import { ActionType } from '../types/actionType';
import { InputProductType } from '../types/product';

export const addProductAction =
  (product: InputProductType) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await createProduct(product);
      dispatch({ type: ActionType.ADD_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updateProductAction =
  (product: UpdateInputType) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await updateProduct(product, product.id);
      dispatch({ type: ActionType.UPDATE_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const deleteProductAction =
  (id: number) => async (dispatch: Dispatch<Action>) => {
    try {
      await removeProduct(id);
      dispatch({ type: ActionType.DELETE_PRODUCT, payload: { id } });
    } catch (error) {}
  };

export const getProductAction = () => async (dispatch: Dispatch<Action>) => {
  try {
    const { data } = await fetchProduct();
    dispatch({ type: ActionType.GET_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
