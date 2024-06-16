import { setTransaction } from '../../feature/data/transactionsSlice'
import { makeRequest } from '../../utils/resquestTemplate'

export const getTransactions = (dispatch, selectedIncome) => {
	const handleResponse = (response) => {
		dispatch(setTransaction(response.data))
	}

	makeRequest({
		dispatch,
		handleResponse,
		method: 'get',
		url: `api/transactions/income/${selectedIncome._id}`,
		timer: 0,
	})
}
