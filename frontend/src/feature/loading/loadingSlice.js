import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	modalLoading: false,
	buttonLoading: false,
	modalButtonLoading: false,
}

const loadingSlice = createSlice({
	name: 'loading',
	initialState: initialState,
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
		setInitialStateLoading: (state) => initialState,
	},
})

export const {
	setLoading,
	setModalLoading,
	setButtonLoading,
	setModalButtonLoading,
	setInitialStateLoading,
} = loadingSlice.actions
export default loadingSlice.reducer
