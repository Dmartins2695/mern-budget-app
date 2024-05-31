import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
	const { token } = useSelector((state) => state.auth)

	const handleRequest = async () => {
		const config = {
			method: 'GET',
			url: '/api/budget',
			baseURL: import.meta.env.VITE_BACKEND_URL,
			headers: {
				'Content-Type': 'application/json',
			},
		}
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		const data = await axios(config)
		console.log(data)
	}
	return (
		<>
			<Button onClick={handleRequest}>Simple Request</Button>
		</>
	)
}

export default Dashboard
