import axios from 'axios'

// const baseUrl = import.meta.env

const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-brr-bupt.vercel.app/',
  withCredentials: true,
})

export default http
