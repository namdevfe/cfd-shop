import axios from 'axios'
import { BASE_URL } from '@/constants/environments'
import tokenMethod from './token'
import { customerService } from '@/services/customerService'

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Handle request before send to server
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`
    return config
  },
  (error) => {
    // Handle error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry &&
      !!tokenMethod.get()
    ) {
      originalRequest._retry = true

      // Call API refresh token
      try {
        const res = await customerService.refreshToken({
          refreshToken: tokenMethod.get()?.refreshToken
        })

        // destructuring
        const { token: accessToken, refreshToken } = res?.data?.data || {}

        // Save token to client-storage
        tokenMethod.set({
          accessToken,
          refreshToken
        })

        // Config original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (error) {
        // Handle error
        console.log('error', error)

        // Remove token
        tokenMethod.remove()
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
