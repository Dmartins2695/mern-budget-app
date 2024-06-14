import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import loadingReducer from '../feature/loading/loadingSlice'
import snackbarReducer from '../feature/snackbar/snackbarSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
		snackbar: snackbarReducer,
	},
})

export default store
