import axios from "axios";
import { TMDB_BASE_URL } from "./tmdb";

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
});

export default tmdbAxios;
