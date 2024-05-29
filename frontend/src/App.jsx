import { useState } from 'react'
import useAuth from './hooks/useAuth'
import axios from 'axios'

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

function App() {
	const { isLogin, token } = useAuth()

	return <>{isLogin ? <Private token={token} /> : <Public />}</>
}

export default App

