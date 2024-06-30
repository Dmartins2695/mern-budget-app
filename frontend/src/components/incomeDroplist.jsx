import { useDispatch, useSelector } from 'react-redux'
import useDictionary from '../hooks/useDictionary'
import { useEffect } from 'react'
import { setIncomes } from '../feature/data/incomeSlice'
import { makeRequest } from '../utils/requestTemplate'
import { Autocomplete, TextField } from '@mui/material'
import { transformDataFOrDroplist } from '../utils/dataTransformation'

const IncomeDroplist = (props) => {
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { incomes } = useSelector((state) => state.incomes)
	const { setSelected } = props

	useEffect(() => {
		if (incomes.length === 0) {
			const handleResponse = (response) => {
				dispatch(setIncomes(response.data))
			}

			makeRequest({
				dispatch,
				handleResponse,
				method: 'get',
				url: '/api/income',
				timer: 0,
			})
		}
	}, [])

	const handleChange = (event, newValue) => {
		setSelected(newValue)
	}

	return (
		<Autocomplete
			disablePortal
			id='combo-box-demo'
			options={transformDataFOrDroplist(incomes)}
			sx={{ m: 2, width: 300, ml: 0 }}
			onChange={handleChange}
			isOptionEqualToValue={(option, value) => option._id === value._id}
			size='small'
			renderInput={(params) => (
				<TextField {...params} label={labelIn('select_incomes')} />
			)}
		/>
	)
}

export default IncomeDroplist
