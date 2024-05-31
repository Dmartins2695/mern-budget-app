import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#284b63',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#3c6e71',
		},
		background: {
			default: '#ffffff',
			paper: '#d9d9d9',
		},
		text: {
			primary: '#284b63',
			secondary: '#ffffff',
		},
	},
})

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#284b63',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#3c6e71',
			contrastText: '#d9d9d9',
		},
		background: {
			default: '#353535',
			paper: '#284b63',
		},
		text: {
			primary: '#d9d9d9',
			secondary: '#ffffff',
		},
	},
})