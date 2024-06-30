import { makeRequest } from '../../utils/requestTemplate'

export const getTransactions = (dispatch, selectedIncome) => {
	const handleResponse = (response) => {
		//dispatch(setTransaction(response.data))
	}

	makeRequest({
		dispatch,
		handleResponse,
		method: 'get',
		url: `api/income/budget/${selectedIncome._id}`,
		timer: 0,
	})
}
