// axiosConfig.js

import axios from 'axios'

// Create a new Axios instance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL, // Set your base URL here
	headers: {
		'Content-Type': 'application/json', // Set any default headers here
	},
})

// Function to set authorization header with bearer token
export const setAuthToken = (token) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axiosInstance.defaults.headers.common['Authorization']
	}
}

export default axiosInstance
