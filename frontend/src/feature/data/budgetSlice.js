import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	budgets: [],
}

const budgetSlice = createSlice({
	name: 'budgets',
	initialState: initialState,
	reducers: {
		setBudgets(state, action) {
			state.budgets = action.payload
		},
		setInitialStateBudget: (state) => initialState,
	},
})

export const { setBudgets, setInitialStateBudget } = budgetSlice.actions
export default budgetSlice.reducer
