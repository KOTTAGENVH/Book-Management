/* eslint-disable no-undef */
import axios from "axios";
//Api Client
const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { apiClient };