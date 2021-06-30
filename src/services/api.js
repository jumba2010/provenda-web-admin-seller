import axios from "axios";
import { getToken } from "./auth";

export const baseURL='https://storage.googleapis.com/nacoesparacristomedia'

const api = axios.create({
  baseURL: "https://nacoesparacristo.org"
});


export default api;