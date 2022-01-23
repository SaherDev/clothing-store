import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, puser) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", puser);
    const { user, accessToken } = res.data;
    dispatch(loginSuccess({ ...user, accessToken }));
  } catch (err) {
    dispatch(loginFailure());
  }
};
