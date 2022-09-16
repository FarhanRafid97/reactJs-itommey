import { Dispatch } from 'redux';

import {
  createProduct,
  fetchProduct,
  removeProduct,
  updateProduct,
} from '../api/product';
import { Action } from '../types/action';
import { ActionType, ErrorType, ToastType } from '../types/actionType';
import { AddInputProductType, UpdateInputProductType } from '../types/product';

export const addProductAction =
  (product: AddInputProductType) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'LOADING_STATE', payload: { loading: true } });
    try {
      const { data } = await createProduct(product);
      dispatch({
        type: ActionType.ADD_PRODUCT,
        payload: {
          toast: ToastType.TOAST_SUCCESS_ADD,
          loading: false,
          error: '',
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: ErrorType.FAILED_ACTION,
        payload: {
          toast: ToastType.TOAST_FAILED,
          error: 'Failed Add New Data',
          loading: false,
        },
      });
    }
  };

export const updateProductAction =
  (product: UpdateInputProductType) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'LOADING_STATE', payload: { loading: true } });
    try {
      const { data } = await updateProduct(product);
      dispatch({
        type: ActionType.UPDATE_PRODUCT,
        payload: {
          toast: ToastType.TOAST_SUCCESS_UPDATE,
          loading: false,
          error: '',
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: ErrorType.FAILED_ACTION,
        payload: {
          toast: ToastType.TOAST_FAILED,
          error: 'Failed Update Data',
          loading: false,
        },
      });
    }
  };
export const deleteProductAction =
  (id: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'LOADING_STATE', payload: { loading: true } });
    try {
      await removeProduct(id);
      dispatch({
        type: ActionType.DELETE_PRODUCT,
        payload: {
          toast: ToastType.TOAST_SUCCESS_DELETE,
          loading: false,
          error: '',
          data: { id },
        },
      });
    } catch (error) {
      dispatch({
        type: ErrorType.FAILED_ACTION,
        payload: {
          toast: ToastType.TOAST_FAILED,
          error: 'Failed Delete Data',
          loading: false,
        },
      });
    }
  };

export const getProductAction = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: 'LOADING_STATE', payload: { loading: true } });
  try {
    const { data } = await fetchProduct();
    dispatch({
      type: ActionType.GET_PRODUCT,
      payload: { toast: ToastType.TOAST_NONE, loading: false, error: '', data },
    });
  } catch (error) {
    dispatch({
      type: ErrorType.FAILED_ACTION,
      payload: {
        toast: ToastType.TOAST_FAILED,
        error: 'Failed Get Products',
        loading: false,
      },
    });
  }
};
