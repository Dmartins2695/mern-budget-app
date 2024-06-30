import {
	Autocomplete,
	Dialog,
	Grid,
	IconButton,
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

const NewBudget = (props) => {
	const { selectedIncome, setOpenAdd, openAdd, handleOpen } = props
	const { categories, parentCategories } = useSelector((state) => state.category)
	const { labelIn } = useDictionary()
	const [parentId, setParentId] = useState('')
	const dispatch = useDispatch()
	const [newBudget, setNewBudget] = useState({
		incomeId: selectedIncome,
		categoryId: '',
		amount: undefined,
		timeToRenew: '',
		recurringTime: '',
		title: '',
	})

	useEffect(() => {
		if (parentCategories.length === 0) {
			getParentCategories(dispatch)
		}
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
			{/*title amount recurringTime renewTime category*/}
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
			<Grid
				container
				alignItems={'center'}
				columnSpacing={2}
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
				<Grid item xs={2}>
					<TextField
						id='title'
						variant='standard'
						value={newBudget.title}
						label={labelIn('form_budget_title')}
						onChange={(e) => handleStateChange(e, setNewBudget)}
					/>
				</Grid>
				<Grid item xs={10}>
					<TextField
						id='amount'
						variant='standard'
						value={newBudget.amount}
						label={labelIn('form_transaction_amount')}
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
			</Grid>
		</Dialog>
	)
}

export default NewBudget
