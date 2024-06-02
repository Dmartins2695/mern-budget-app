import { createTheme } from '@mui/material'

export const reserveTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#284b63',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#3c6e71',
		},
		paperBackground: {
			main: '#ededed',
		},
		background: {
			default: '#ffffff',
			paper: '#353535',
		},
		text: {
			primary: '#d9d9d9',
			secondary: '#284b63',
		},
	},
})

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#284b63',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#3c6e71',
			contrastText: '#ffffff',
		},
		paperBackground: {
			main: '#ededed',
		},
		background: {
			default: '#ffffff',
			contrast: '#00000015',
			paper: '#ededed',
		},
		text: {
			primary: '#353535',
			secondary: '#284b63',
		},
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#ededed',
					color: '#353535',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#284b63',
					color: '#ffffff',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					'&.MuiButton-containedPrimary': {
						backgroundColor: '#284b63',
						color: '#ffffff',
					},
					'&.MuiButton-containedSecondary': {
						backgroundColor: '#3c6e71',
						color: '#ffffff',
					},
					'&.MuiButton-outlinedPrimary': {
						borderColor: '#284b63',
						color: '#284b63',
					},
					'&.MuiButton-outlinedSecondary': {
						borderColor: '#3c6e71',
						color: '#3c6e71',
					},
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					'color': '#353535',
					'&.MuiTypography-colorPrimary': {
						color: '#ffffff',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: '#ededed',
					color: '#353535',
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#353535',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: '#dedede',
				},
				head: {
					backgroundColor: '#3c6e71',
					color: '#ffffff',
				},
			},
		},
	},
})

export const reserveDarkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffffff',
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
			secondary: '#00000012',
		},
		paperBackground: {
			main: '#4e4e4e',
		},
	},
})

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#284b63',
			contrastText: '#e0e0e0',
		},
		secondary: {
			main: '#3c6e71',
			contrastText: '#e0e0e0',
		},
		background: {
			default: '#121212',
			contrast: '#ffffff0d',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#e0e0e0',
			secondary: '#b0b0b0',
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: '#1e1e1e',
						color: '#e0e0e0',
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: '#284b63',
						color: '#e0e0e0',
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						'&.MuiButton-containedPrimary': {
							backgroundColor: '#284b63',
							color: '#e0e0e0',
						},
						'&.MuiButton-containedSecondary': {
							backgroundColor: '#3c6e71',
							color: '#e0e0e0',
						},
						'&.MuiButton-outlinedPrimary': {
							borderColor: '#284b63',
							color: '#284b63',
						},
						'&.MuiButton-outlinedSecondary': {
							borderColor: '#3c6e71',
							color: '#3c6e71',
						},
					},
				},
			},
			MuiTypography: {
				styleOverrides: {
					root: {
						'color': '#e0e0e0',
						'&.MuiTypography-colorPrimary': {
							color: '#e0e0e0',
						},
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						backgroundColor: '#1e1e1e',
						color: '#e0e0e0',
					},
				},
			},
			MuiTable: {
				styleOverrides: {
					root: {
						backgroundColor: '#1e1e1e',
						color: '#e0e0e0',
					},
				},
			},
			MuiTableCell: {
				styleOverrides: {
					root: {
						borderColor: '#333333',
					},
					head: {
						backgroundColor: '#3c6e71',
						color: '#e0e0e0',
					},
				},
			},
		},
	},
})
