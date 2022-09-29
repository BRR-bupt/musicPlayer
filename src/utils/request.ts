import axios from 'axios'

// const baseUrl = import.meta.env

const http = axios.create({
  baseURL: 'http://buptyi.xyz:3000',
  withCredentials: true,
})

export default http
