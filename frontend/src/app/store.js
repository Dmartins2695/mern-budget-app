import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import categoryReducer from '../feature/data/categorySlice'
import incomesReducer from '../feature/data/incomeSlice'
import loadingReducer from '../feature/loading/loadingSlice'
import snackbarReducer from '../feature/snackbar/snackbarSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		snackbar: snackbarReducer,
		loading: loadingReducer,
		incomes: incomesReducer,
		category: categoryReducer,
	},
})

export default store
