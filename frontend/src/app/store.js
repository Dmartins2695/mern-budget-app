import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import categoryReducer from '../feature/data/categorySlice'
import incomesReducer from '../feature/data/incomeSlice'
import loadingReducer from '../feature/loading/loadingSlice'
import snackbarReducer from '../feature/snackbar/snackbarSlice'
import transactionsReducer from '../feature/data/transactionsSlice'
import budgetReducer from '../feature/data/budgetSlice'


const store = configureStore({
	reducer: {
		auth: authReducer,
		snackbar: snackbarReducer,
		loading: loadingReducer,
		incomes: incomesReducer,
		category: categoryReducer,
		transactions: transactionsReducer,
		budget: budgetReducer,
	},
})

export default store
