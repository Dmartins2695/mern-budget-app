import {
	Autocomplete,
	Dialog,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import useDictionary from '../../../hooks/useDictionary'
import { transformDataFOrDroplist } from '../../../utils/dataTransformation'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getParentCategories, getSubCategories } from '../../category/functions'
import { handleStateChange } from '../../../utils/stateControlFunctions'
import { makeRequest } from '../../../utils/requestTemplate'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import LoadingButton from '@mui/lab/LoadingButton'

const NewBudget = (props) => {
	const { selectedIncome, setOpenAdd, openAdd, handleOpen } = props
	const { categories, parentCategories } = useSelector((state) => state.category)
	const { buttonLoading } = useSelector((state) => state.loading)
	const { labelIn } = useDictionary()
	const [parentId, setParentId] = useState('')
	const [recurringTimes, setRecurringTimes] = useState([])
	const dispatch = useDispatch()
	const [newBudget, setNewBudget] = useState({
		incomeId: selectedIncome,
		categoryId: '',
		amount: undefined,
		timeToRenew: null,
		recurringTime: '',
		endDate: null,
		title: '',
	})

	const getRecurringTimes = () => {
		const handleResponse = (response) => {
			console.log(response)
			setRecurringTimes(response.data)
		}

		makeRequest({
			dispatch,
			handleResponse,
			method: 'get',
			url: '/api/budget/recurring-times',
		})
	}

	useEffect(() => {
		if (parentCategories.length === 0) {
			getParentCategories(dispatch)
		}
		getRecurringTimes()
	}, [])

	useEffect(() => {
		if (parentId !== '') {
			getSubCategories(dispatch, { item: { _id: parentId } })
		}
	}, [parentId])

	const handleChange = (event, newValue) => {
		setNewBudget((prev) => ({ ...prev, categoryId: newValue._id }))
	}

	const handleChangeParent = (event, newValue) => {
		setParentId(newValue?._id)
	}

	const addBudget = (event, newValue) => {}

	return (
		<Dialog
			open={openAdd}
			onClose={handleOpen}
			PaperProps={{
				sx: {
					p: 4,
					pt: 2,
				},
			}}
			maxWidth='lg'>
			<Grid
				container
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}>
				<Typography variant='h6' sx={{ mb: 2 }}>
					{labelIn('new_budget')}
				</Typography>
				<IconButton onClick={handleOpen}>
					<CloseIcon />
				</IconButton>
			</Grid>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid
					container
					alignItems={'center'}
					columnSpacing={3}
					spacing={2}
					sx={{ paddingLeft: 2 }}>
					<Grid item xs={4}>
						<Autocomplete
							options={transformDataFOrDroplist(parentCategories)}
							onChange={handleChangeParent}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							renderInput={(params) => (
								<TextField {...params} label={labelIn('select_parent_category')} />
							)}
							size='small'
							sx={{
								'& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input':
									{ minWidth: '30px' },
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							options={transformDataFOrDroplist(categories)}
							onChange={handleChange}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							renderInput={(params) => (
								<TextField {...params} label={labelIn('select_subcategory')} />
							)}
							size='small'
							sx={{
								'& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input':
									{ minWidth: '30px' },
							}}
						/>
					</Grid>
					<Grid item xs={4} />
					<Grid item xs={3}>
						<TextField
							id='title'
							fullWidth
							variant='standard'
							value={newBudget.title}
							label={labelIn('form_budget_title')}
							onChange={(e) => handleStateChange(e, setNewBudget)}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							id='amount'
							variant='standard'
							value={newBudget.amount}
							fullWidth
							label={labelIn('form_budget_amount')}
							onChange={(e) => {
								const value = e.target.value
								if (/^\d*$/.test(value)) {
									// Allow only digits
									handleStateChange(e, setNewBudget)
								}
							}}
							inputProps={{ inputMode: 'numeric' }}
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControl variant='standard' fullWidth>
							<InputLabel id='recurringTime'>
								{labelIn('form_budget_recurring_time')}
							</InputLabel>
							<Select
								labelId='recurringTime'
								id='recurringTime'
								value={newBudget.recurringTime}
								onChange={(e) =>
									handleStateChange(
										{ target: { id: 'recurringTime', value: e.target.value } },
										setNewBudget,
									)
								}
								label={labelIn('form_budget_recurring_time')}>
								{recurringTimes.map((time, index) => (
									<MenuItem key={index} value={time}>
										{time}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2} />
					<Grid item xs={3}>
						<DatePicker
							slotProps={{
								field: { clearable: true },
								textField: { size: 'small' },
							}}
							sx={{ mt: 1 }}
							disablePast
							id='timeToRenew'
							label={labelIn('form_budget_time_to_renew')}
							value={newBudget.timeToRenew}
							onChange={(newValue) =>
								handleStateChange(
									{ target: { id: 'timeToRenew', value: newValue } },
									setNewBudget,
								)
							}
						/>
					</Grid>
					<Grid item xs={3}>
						<DatePicker
							slotProps={{
								field: { clearable: true },
								textField: { size: 'small' },
							}}
							sx={{ mt: 1 }}
							disablePast
							id='endDate'
							label={labelIn('form_budget_end_date')}
							value={newBudget.endDate}
							s
							onChange={(newValue) =>
								handleStateChange(
									{ target: { id: 'endDate', value: newValue } },
									setNewBudget,
								)
							}
						/>
					</Grid>
					<Grid item xs={9} />
					<Grid item container justifyContent={'flex-end'} xs={3}>
						<LoadingButton
							loading={buttonLoading}
							variant='contained'
							onClick={addBudget}
							loadingPosition='start'
							startIcon={<div />}
							size='small'
							sx={{ mt: 1 }}>
							{labelIn('form_button_new_budget')}
						</LoadingButton>
					</Grid>
				</Grid>
			</LocalizationProvider>
		</Dialog>
	)
}

export default NewBudget
