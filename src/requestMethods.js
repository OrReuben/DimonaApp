import axios from "axios";

const BASE_URL = "https://dimona-api.cyclic.app/api/";
const user = localStorage.getItem("logged");
let accessToken = JSON.parse(user)?.accessToken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${accessToken}` },
});