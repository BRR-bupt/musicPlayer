import axios from 'axios'

// const baseUrl = import.meta.env

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true,
})

export default http
