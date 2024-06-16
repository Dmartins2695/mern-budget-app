import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	incomes: [],
}

const incomeSlice = createSlice({
	name: 'incomes',
	initialState: initialState,
	reducers: {
		setIncomes(state, action) {
			state.incomes = action.payload
		},
		setInitialStateIncomes: (state) => initialState,
	},
})

export const { setIncomes, setInitialStateIncomes } = incomeSlice.actions
export default incomeSlice.reducer
