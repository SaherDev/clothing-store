import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const BASE_URL = "http://localhost:8080/api/";
let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTliOWU1M2M5NGZmZTlmMWNlZTg3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjcwNzQ2OCwiZXhwIjoxNjQyOTY2NjY4fQ.0-luXgCZGcAysRdqJRjv_NZvRKGHYzdilo3N-WKL4kY";
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) .currentUser.accessToken;

//let TOKEN = localStorage.getItem("accessToken");

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { Authorization: `Bearer ${TOKEN}` },
});

userRequest.interceptors.request.use(async (req) => {
  if (!TOKEN) {
    TOKEN = localStorage.getItem("accessToken");
    req.headers.Authorization = `Bearer ${TOKEN}`;
  }

  const userjwt = jwt_decode(TOKEN);
  const isExpired = dayjs.unix(userjwt.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  let refreshtoken = localStorage.getItem("refreshtoken");

  const response = await publicRequest.post(`/auth/refresh_token/`, {
    refreshtoken: refreshtoken,
  });

  localStorage.setItem("accessToken", response.data.accessToken);
  req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return req;
});

export { userRequest, publicRequest };
