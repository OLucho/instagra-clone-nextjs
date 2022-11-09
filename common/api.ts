import axios from "axios"

const baseURL = process.env.NODE_ENV === "production"
  ? "https://instagra-clone-nextjs.vercel.app"
  : "http://localhost:3000/"

export const api = axios.create({ baseURL })
