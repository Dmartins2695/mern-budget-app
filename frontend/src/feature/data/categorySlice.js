import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		categories: [],
		parentCategories: [],
	},
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload
		},
		setParentCategories(state, action) {
			state.parentCategories = action.payload
		},
	},
})

export const { setCategories, setParentCategories } = categorySlice.actions
export default categorySlice.reducer
