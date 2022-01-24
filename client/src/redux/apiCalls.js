import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../utils/axiosInstanse";

export const login = async (dispatch, puser) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", puser);

    const { user, accessToken, refreshtoken } = res.data;

    dispatch(loginSuccess({ ...user, accessToken, refreshtoken }));
  } catch (err) {
    dispatch(loginFailure());
  }
};
