import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://todo-smart-backend-db.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
})