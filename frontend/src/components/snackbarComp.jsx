import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setCloseSnackbar } from '../feature/snackbar/snackbarSlice'

const SnackbarComp = () => {
	const dispatch = useDispatch()
	const { severity, variant, message, open } = useSelector(
		(state) => state.snackbar,
	)

	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		dispatch(setCloseSnackbar(false))
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleCloseSnackBar}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
			<Alert
				onClose={handleCloseSnackBar}
				severity={severity}
				variant={variant}
				sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default SnackbarComp
