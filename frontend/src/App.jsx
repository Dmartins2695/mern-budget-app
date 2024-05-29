import axios from 'axios'
import { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Home from './pages/home'
import ErrorPage from './pages/errorPage'
import Dashboard from './pages/dashboard'
import Budget from './pages/budget'
import SideMenu from './components/sideMenu'
import { Box, Grid } from '@mui/material'

axios.defaults.baseURL = 'http://localhost:5000'

const Private = (props) => {
	const [data, setData] = useState(null)

	const callBackend = () => {
		const config = {
			headers: {
				authorization: `Bearer ${props.token}`,
			},
		}

		axios
			.get('/api/budget', config)
			.then((res) => setData(res.data))
			.catch((err) => console.error(err))
	}

	console.log(data)

	return (
		<>
			<div>IN THE APP</div>
			<button onClick={callBackend}>Fetch data</button>
		</>
	)
}
const Public = () => {
	return <>OUT OF THE APP</>
}

function Dummy() {
	const { isLogin, token } = useAuth()

	return <>{isLogin ? <Private token={token} /> : <Public />}</>
}

const PermanentElementsWrapper = () => {
	return (
		<Grid container>
			<Grid item xs={4}>
				<SideMenu />
			</Grid>
			<Grid item xs>
				<Outlet />
			</Grid>
		</Grid>
	)
}

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route element={<PermanentElementsWrapper />}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/budgets' element={<Budget />} />
					<Route path='/' element={<Home />} />
					<Route path='/*' element={<Home />} />
					<Route path='/404' element={<ErrorPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
