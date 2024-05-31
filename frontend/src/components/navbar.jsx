import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Grid, Switch, styled } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import useDictionary from '../hooks/useDictionary'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { performLogin, performLogout } from '../feature/auth/authSlice'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Navbar = (props) => {
	const { handleDrawerOpen, open, setIsDarkMode } = props
	const { labelIn } = useDictionary()
	const theme = useTheme()
	const dispatch = useDispatch()
	const { isLogin, token } = useSelector((state) => state.auth)

	const handleThemeMode = (e) => {
		setIsDarkMode((prev) => !prev)
	}

	const login = () => {
		dispatch(performLogin())
	}
	const logout = () => {
		dispatch(performLogout())
	}

	return (
		<AppBar position='fixed' open={open}>
			<Toolbar>
				<Grid container alignItems={'center'}>
					<Grid item xs>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								aria-label='open drawer'
								onClick={handleDrawerOpen}
								edge='start'
								sx={{
									mr: 2,
									...(open && { display: 'none' }),
									color: theme.palette.primary.contrastText,
								}}>
								<MenuIcon />
							</IconButton>
							<Typography variant='h6' noWrap component='div'>
								{labelIn('header_title')}
							</Typography>
						</div>
					</Grid>
					<Grid item>
						<Switch
							color={'inherit'}
							onClick={handleThemeMode}
							icon={<LightModeIcon />}
							checkedIcon={<DarkModeIcon />}
							sx={{
								'& .MuiSwitch-switchBase': {
									paddingTop: '7px',
									marginLeft: 'auto',
								},
							}}
						/>
						{/* login button, notifications*/}
						{isLogin ? (
							<Button color={'inherit'} variant='text' onClick={logout}>
								Logout
							</Button>
						) : (
							<Button color={'inherit'} variant='outlined' onClick={login}>
								Login
							</Button>
						)}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar