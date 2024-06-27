import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	transactions: [],
}

const transactionSlice = createSlice({
	name: 'transactions',
	initialState: initialState,
	reducers: {
		setTransaction(state, action) {
			state.transactions = action.payload
		},
		setInitialStateTransaction: (state) => initialState,
	},
})

export const { setTransaction, setInitialStateTransaction } =
	transactionSlice.actions
export default transactionSlice.reducer
