import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import loadingReducer from '../feature/loading/loadingSlice'
import snackbarReducer from '../feature/snackbar/snackbarSlice'
import incomesReducer from '../feature/data/incomeSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
		snackbar: snackbarReducer,
		incomes: incomesReducer,
	},
})

export default store
