import axios from "axios";

const api = axios.create({

  baseURL:
    "https://thumblify-server-drab.vercel.app/api",

  withCredentials: true,
});

export default api;