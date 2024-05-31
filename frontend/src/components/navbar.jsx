import { useTheme } from '@emotion/react'
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
	console.log(theme)

	const handleThemeMode = (e) => {
		setIsDarkMode((prev) => !prev)
	}

	return (
		<AppBar position='fixed' open={open}>
			<Toolbar>
				<Grid container alignItems={'center'}>
					<Grid item>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{ mr: 2, ...(open && { display: 'none' }) }}>
							<MenuIcon />
						</IconButton>
					</Grid>
					<Grid item xs>
						<Typography variant='h6' noWrap component='div'>
							{labelIn('header_title')}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						{/* login button, notifications*/}
						<Button color={'inherit'} variant='outlined'>
							Login
						</Button>
						<Switch
							color={'inherit'}
							onClick={handleThemeMode}
							icon={<LightModeIcon />}
							checkedIcon={<DarkModeIcon />}
							sx={{
								'& .MuiSwitch-switchBase': {
									paddingTop: '7px',
								},
							}}
						/>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
