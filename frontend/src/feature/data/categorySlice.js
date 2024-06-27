import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categories: [],
	parentCategories: [],
}

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload
		},
		setParentCategories(state, action) {
			state.parentCategories = action.payload
		},
		setInitialStateCategories: (state) => initialState,
	},
})

export const { setCategories, setParentCategories, setInitialStateCategories } =
	categorySlice.actions

export default categorySlice.reducer
