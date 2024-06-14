import { createSlice } from '@reduxjs/toolkit'

const incomeSlice = createSlice({
	name: 'incomes',
	initialState: {
        incomes: []
	},
	reducers: {
		setIncomes(state, action) {
			state.incomes = action.payload
		}
	},
})

export const {
	setIncomes,
} = incomeSlice.actions
export default incomeSlice.reducer
