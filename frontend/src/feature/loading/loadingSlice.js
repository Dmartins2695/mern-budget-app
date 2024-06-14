import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
	name: 'loading',
	initialState: {
		loading: false,
		modalLoading: false,
		buttonLoading: false,
		modalButtonLoading: false,
	},
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload
		},
		setModalLoading(state, action) {
			state.modalLoading = action.payload
		},
		setButtonLoading(state, action) {
			state.buttonLoading = action.payload
		},
		setModalButtonLoading(state, action) {
			state.modalButtonLoading = action.payload
		},
	},
})

export const {
	setLoading,
	setModalLoading,
	setButtonLoading,
	setModalButtonLoading,
} = loadingSlice.actions
export default loadingSlice.reducer
