import Box from '@mui/material/Box'
import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import SideMenu from './sideMenu'

const Layout = (props) => {
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const [selectedIndex, setSelectedIndex] = useState(null)

	const { isLogin } = useSelector((state) => state.auth)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleListItemClick = (e, index, url) => {
		setSelectedIndex(index)
		navigate(url)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<Navbar
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				setIsLightMode={props.setIsLightMode}
				isLightMode={props.isLightMode}
			/>
			{isLogin ? (
				<SideMenu
					open={open}
					selectedIndex={selectedIndex}
					handleListItemClick={handleListItemClick}
					handleDrawerClose={handleDrawerClose}
				/>
			) : (
				<div style={{ paddingTop: 80, paddingLeft: 15 }}>
					<Outlet />
				</div>
			)}
		</Box>
	)
}

export default Layout
