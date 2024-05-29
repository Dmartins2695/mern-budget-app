import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomListItem = (props) => {
	const { selectedIndex, handleListItemClick, index, item } = props
	const { divider, dense, style, label, url } = item
	return (
		<ListItemButton
			selected={selectedIndex === index}
			divider={divider}
			dense={dense}
			onClick={(event) => handleListItemClick(event, index, url)}
			sx={style}>
			<ListItemText primary={label} />
		</ListItemButton>
	)
}

const menuItems = [
	{
		label: 'Dashboard',
		url: '/dashboard',
	},
	{
		label: 'Budget',
		url: '/budgets',
	},
]

const SideMenu = (props) => {
	const [selectedIndex, setSelectedIndex] = React.useState(0)
	const navigate = useNavigate()

	const handleListItemClick = (event, index, url) => {
		setSelectedIndex(index)
		navigate(url)
	}

	return (
		<Drawer
			variant='permanent'
			anchor='left'
			sx={{
				'& [class*="MuiPaper-root"][class*="MuiDrawer-paper"]': {
					background: '#2c2c2c',
					color: 'white',
				},
			}}>
			<Box sx={{ width: 239 }}>
				<List component='nav' aria-label='main mailbox folders'>
					{menuItems &&
						menuItems.map((item, index) => {
							return (
								<CustomListItem
									key={`side-menu-${index}`}
									selectedIndex={selectedIndex}
									handleListItemClick={handleListItemClick}
									item={item}
									index={index}
								/>
							)
						})}
				</List>
			</Box>
		</Drawer>
	)
}

export default SideMenu
