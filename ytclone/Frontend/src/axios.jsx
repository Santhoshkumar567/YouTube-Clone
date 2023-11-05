import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7050/api",
});

export default instance;