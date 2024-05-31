import { Button } from '@mui/material'
import React from 'react'
import axiosInstance from '../../config/axiosInstance'

const Dashboard = () => {
	const handleRequest = async () => {
		const data = await axiosInstance.get('/api/budget')
		console.log(data)
	}
	return (
		<>
			<Button onClick={handleRequest}>Simple Request</Button>
		</>
	)
}

export default Dashboard
