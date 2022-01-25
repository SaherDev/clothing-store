import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../utils/axiosInstanse";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

export const login = async (pUser, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", pUser);

    const { user, accessToken, refreshtoken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshtoken", refreshtoken);
    dispatch(loginSuccess(user));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get(`/products?offset=0&limit=4`);
    dispatch(getProductSuccess(res.data.products));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);

    dispatch(updateProductSuccess({ id, product: res.data.product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data.product));
    window.location.reload(false);
  } catch (err) {
    dispatch(addProductFailure());
  }
};
