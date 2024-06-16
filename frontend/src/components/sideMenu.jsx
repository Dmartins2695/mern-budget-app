import { useTheme } from '@emotion/react'
import useDictionary from '../hooks/useDictionary'
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
} from '@mui/material'
import SnackbarComp from './snackbarComp'
import { Outlet } from 'react-router-dom'
import logo from '../resources/Logo2.png'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CategoryIcon from '@mui/icons-material/Category'

const drawerWidth = 240

const menuItems = [
	{
		label: 'menu_item_dashboard',
		url: '/',
		icon: <DashboardIcon />,
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
	{
		label: 'menu_item_income',
		url: '/income',
		icon: <AccountBalanceIcon />,
	},
	{
		label: 'menu_item_transactions',
		url: '/transactions',
		icon: <ReceiptLongIcon />,
	},
]

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingBottom: 0,
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

const SideMenu = (props) => {
	const { handleDrawerClose, selectedIndex, handleListItemClick, open } = props
	const { labelIn } = useDictionary()
	const theme = useTheme()
	return (
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
					<img
						src={logo}
						alt='Logo'
						style={{ height: 70, width: 116, marginRight: 15 }}
					/>
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
	)
}

export default SideMenu
