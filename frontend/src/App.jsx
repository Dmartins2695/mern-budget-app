import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Layout from './components/layout'
import { setAuthToken } from './config/axiosInstance'
import { darkTheme, lightTheme } from './config/theme/theme'
import { initializeKeycloak } from './feature/auth/authSlice'
import Budget from './pages/budget'
import Dashboard from './pages/dashboard'
import ErrorPage from './pages/errorPage'
import Income from './pages/income'

const Authenticated = (props) => {
	return (
		<Routes>
			<Route path='/budgets' element={<Budget />} />
			<Route path='/income' element={<Income />} />
			<Route path='/' element={<Dashboard />} />
			<Route path='/*' element={<Dashboard />} />
		</Routes>
	)
}

const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const isRun = useRef(false)
	const dispatch = useDispatch()
	const { isLogin, token } = useSelector((state) => state.auth)
	useEffect(() => {
		if (isRun.current) return
		isRun.current = true
		dispatch(initializeKeycloak())
	}, [dispatch])

	useEffect(() => {
		setAuthToken(token)
	}, [token])

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<Router>
				<div className='App'>
					<Routes>
						<Route element={<Layout setIsDarkMode={setIsDarkMode} />}>
							<Route
								path='*'
								element={
									isLogin ? <Authenticated /> : <Navigate replace to={'/welcome'} />
								}
							/>
							<Route path='/welcome' element={<div>Welcome page</div>} />
							<Route path='/404' element={<ErrorPage />} />
							<Route path='*' element={<ErrorPage />} />
						</Route>
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	)
}

export default App
