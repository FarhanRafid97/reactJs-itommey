import { Action } from '../types/action';
import { ActionType, ErrorType } from '../types/actionType';

export interface ProductStateType {
  toast: string;
  loading: boolean;
  error: string;
  data: {
    id: number;
    name: string;
    qty: number;
    picture: string;
    isActive: boolean;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const productReducers = (
  state: ProductStateType = {
    toast: 'TOAST_NONE',
    loading: false,
    error: '',
    data: [],
  },
  action: Action
): ProductStateType => {
  switch (action.type) {
    case 'LOADING_STATE':
      return {
        toast: '',
        loading: true,
        error: '',
        data: state.data,
      };
    case ActionType.GET_PRODUCT:
      return {
        toast: action.payload.toast,
        loading: action.payload.loading,
        error: action.payload.error,
        data: action.payload.data,
      };

    case ActionType.ADD_PRODUCT:
      return {
        toast: action.payload.toast,
        loading: action.payload.loading,
        error: action.payload.error,
        data: [...state.data, action.payload.data],
      };

    case ActionType.UPDATE_PRODUCT:
      const updatedData = state.data.map((data) =>
        data.id === action.payload.data.id ? action.payload.data : data
      );
      return {
        toast: action.payload.toast,
        loading: action.payload.loading,
        error: action.payload.error,
        data: updatedData,
      };

    case ActionType.DELETE_PRODUCT:
      const notDeletedData = state.data.filter(
        (data) => data.id !== action.payload.data.id
      );
      return {
        toast: action.payload.toast,
        loading: action.payload.loading,
        error: action.payload.error,
        data: notDeletedData,
      };

    case ErrorType.FAILED_ACTION:
      return {
        toast: action.payload.toast,
        loading: action.payload.loading,
        error: action.payload.error,
        data: state.data,
      };

    default:
      return state;
  }
};
export default productReducers;
