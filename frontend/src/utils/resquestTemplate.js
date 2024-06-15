import axiosInstance from '../config/axiosInstance'
import { setCallSnackbar } from '../feature/snackbar/snackbarSlice'

export const makeRequest = (props) => {
	const { dispatch, method, url, params, data, handleResponse, loadingAction } =
		props
	dispatch(loadingAction(true))

	const config = {
		method: method,
		url: url,
		params: params || {},
		data: data || {},
	}

	try {
        // time out is here so its possible to see the loading feature working can be removed!
		setTimeout(() => {
			axiosInstance(config).then((response) => {
				handleResponse(response)
				dispatch(loadingAction(false))
			})
		}, 1000)
	} catch (e) {
		console.log(e)
		dispatch(loadingAction(false))
		dispatch(
			setCallSnackbar({
				severity: 'error',
				message: e.response.data.error || e.response.statusText,
			}),
		)
	}
}
