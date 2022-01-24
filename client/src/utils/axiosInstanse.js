import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:8080/api/";

let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
let currentUser = user && JSON.parse(user).currentUser;
let TOKEN = currentUser?.accessToken;

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { Authorization: `Bearer ${TOKEN}` },
});

userRequest.interceptors.request.use(async (req) => {
  if (!TOKEN) {
    user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    currentUser = user && JSON.parse(user).currentUser;
    TOKEN = currentUser?.accessToken;
    req.headers.Authorization = `Bearer ${TOKEN}`;
  }
  const userjwt = jwt_decode(TOKEN);
  const isExpired = dayjs.unix(userjwt.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await publicRequest.post(`/auth/refresh_token/`, {
    refreshtoken: currentUser.refreshtoken,
  });

  currentUser.refreshtoken = response.data.accessToken;
  localStorage.setItem("persist:root", JSON.stringify(currentUser));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export { userRequest, publicRequest };
