import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState: {
		open: false,
		severity: '',
		variant: '',
		message: '',
	},
	reducers: {
		setCallSnackbar(state, action) {
			state.open = true
			state.severity = action.payload.severity
			state.variant = action.payload.variant
			state.message = action.payload.message
		},
		setCloseSnackbar(state, action) {
			state.open = action.payload
		},
	},
})

export const { setCallSnackbar, setCloseSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
