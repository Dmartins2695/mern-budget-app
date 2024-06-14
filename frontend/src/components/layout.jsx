import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { styled, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'

import CategoryIcon from '@mui/icons-material/Category'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import useDictionary from '../hooks/useDictionary'
import logo from '../resources/logo1.png'
import Navbar from './navbar'
import SnackbarComp from './snackbarComp'

const drawerWidth = 240

const menuItems = [
	{
		label: 'menu_item_dashboard',
		url: '/',
		icon: <DashboardIcon />,
	},
	{
		label: 'menu_item_income',
		url: '/income',
		icon: <AccountBalanceIcon />,
	},
	{
		label: 'menu_item_budget',
		url: '/budgets',
		icon: <AccountBalanceWalletIcon />,
	},
	{
		label: 'menu_item_category',
		url: '/category',
		icon: <CategoryIcon />,
	},
]

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	}),
)

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}))

const Layout = (props) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const [selectedIndex, setSelectedIndex] = React.useState(null)
	const { labelIn } = useDictionary()
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
				setIsDarkMode={props.setIsDarkMode}
			/>
			{isLogin ? (
				<>
					<Drawer
						sx={{
							'width': drawerWidth,
							'flexShrink': 0,
							'& .MuiDrawer-paper': {
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
						variant='persistent'
						anchor='left'
						open={open}>
						<DrawerHeader>
							<img src={logo} alt='Logo' style={{ height: 80, width: 300 }} />
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
							</IconButton>
						</DrawerHeader>
						<List>
							{menuItems.map((item, index) => (
								<ListItem
									key={item.label}
									disablePadding
									sx={(theme) => ({
										bgcolor:
											selectedIndex === index
												? theme.palette.primary.main + '61'
												: 'inherit',
									})}>
									<ListItemButton
										selected={selectedIndex === index}
										onClick={(event) => handleListItemClick(event, index, item.url)}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={labelIn(item.label)} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Drawer>

					<Main open={open}>
						<DrawerHeader />
						<SnackbarComp />
						<Outlet />
					</Main>
				</>
			) : (
				<div style={{ paddingTop: 80, paddingLeft: 15 }}>
					<Outlet />
				</div>
			)}
		</Box>
	)
}

export default Layout
