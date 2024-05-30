import axios from 'axios'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import useAuth from './hooks/useAuth'
import Budget from './pages/budget'
import Dashboard from './pages/dashboard'
import ErrorPage from './pages/errorPage'

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

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/budgets' element={<Budget />} />
					<Route path='/income' element={<Budget />} />
					<Route path='/' element={<Dashboard />} />
					<Route path='/404' element={<ErrorPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
