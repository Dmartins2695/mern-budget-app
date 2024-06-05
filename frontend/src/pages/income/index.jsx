import { useTheme } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	TextField,
	Typography,
	styled,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { handleStateChange } from '../../utils/stateControlFunctions'
import useDictionary from '../../hooks/useDictionary'

const Item = styled(Paper)(({ theme, width, height }) => ({
	padding: 25,
	width: width,
	height: height,
	marginLeft: 3,
}))

const IncomeDisplayer = ({ title, amount, index, selected, setSelected }) => {
	const theme = useTheme()

	return (
		<div style={{ marginBottom: 10 }}>
			{title && amount && (
				<Accordion
					disableGutters
					elevation={0}
					sx={{
						borderRadius: '5px',
						position: 'unset',
						border: `1px solid ${theme.palette.primary.main + '12'}`,
						background: theme.palette.background.default + '61',
					}}>
					<AccordionSummary
						sx={{
							borderRadius: '5px',
							backgroundColor:
								index === selected
									? theme.palette.primary.main + '61'
									: theme.palette.background.contrast,
						}}
						onClick={() => setSelected(index)}>
						<Grid container alignItems='center' justifyContent='space-between'>
							<Typography variant='body1' display='inline'>
								{title}
							</Typography>
							<Typography variant='body2' display='inline'>
								{amount}
							</Typography>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						{/* budgets basic info maybe make loop for data*/}
						{/* Missing create api to grab incomes with basic info of budgets */}
						<Grid container alignItems='center' justifyContent='space-between'>
							<Typography variant='body1' display='inline'>
								{/* replace with data variable */} Missing
							</Typography>
							<Typography variant='body2' display='inline'>
								{/* replace with data variable */} data
							</Typography>
						</Grid>
					</AccordionDetails>
				</Accordion>
			)}
		</div>
	)
}

const NewIncome = (props) => {
	const { setAddedIncome } = props
	const theme = useTheme()
	const { labelIn } = useDictionary()
	const [newIncomeObject, setNewIncomeObject] = useState({
		title: '',
		amount: '',
	})

	const handleAddIncome = () => {
		const addIncome = async () => {
			const response = await axiosInstance.post('/api/income', newIncomeObject)
			if (response.status === 200) {
				setAddedIncome(true)
				// add snackbar alert to success with name of created Income
			}
		}

		addIncome()
	}

	return (
		<Grid
			container
			direction='column'
			alignItems='flex-start'
			justifyContent='center'
			sx={{
				border: `1px solid ${theme.palette.primary.main + '12'}`,
				background: theme.palette.background.default + '61',
				p: 2,
				borderRadius: '5px',
				mb: 2,
			}}>
			<Typography variant='body1' sx={{ mb: 1 }}>
				{labelIn('new_income')}
			</Typography>
			<Grid container justifyContent={'space-between'} alignItems='center'>
				<Grid item>
					<TextField
						id='title'
						variant='standard'
						value={newIncomeObject.title}
						label={labelIn('new_income_title')}
						onChange={(e) => handleStateChange(e, setNewIncomeObject)}
					/>
				</Grid>
				<Grid item>
					<TextField
						id='amount'
						variant='standard'
						value={newIncomeObject.amount}
						label={labelIn('new_income_amount')}
						onChange={(e) => {
							const value = e.target.value
							if (/^\d*$/.test(value)) {
								// Allow only digits
								handleStateChange(e, setNewIncomeObject)
							}
						}}
						inputProps={{ inputMode: 'numeric' }}
					/>
				</Grid>
			</Grid>
			<Grid container justifyContent='flex-end'>
				<Button
					variant='contained'
					onClick={handleAddIncome}
					size='small'
					sx={{ mt: 2 }}>
					{labelIn('income_button_add')}
				</Button>
			</Grid>
		</Grid>
	)
}

const Income = () => {
	const [incomes, setIncomes] = useState([])
	const [addedIncome, setAddedIncome] = useState(false)
	const [open, setOpen] = useState(false)
	const theme = useTheme()
	const { labelIn } = useDictionary()
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		const getIncomes = async () => {
			const response = await axiosInstance.get('/api/income')
			setIncomes(response.data)
		}
		getIncomes()
		setAddedIncome(false)
	}, [addedIncome])

	const handleAddIncome = () => {
		setOpen((prev) => !prev)
	}

	return (
		<Box sx={{ p: 5 }}>
			<Grid container justifyContent='center' alignItems={'center'}>
				<Grid item xs={3}>
					<Item width={500}>
						<Grid
							container
							alignItems={'center'}
							justifyContent={'space-between'}
							sx={{ pb: 2 }}>
							{/* Title of paper */}
							<Typography variant='h5' display='inline'>
								{labelIn('incomes_page_title')}
							</Typography>
							{/* Add and close Icon */}
							<IconButton onClick={handleAddIncome}>
								{open ? <CloseIcon /> : <AddIcon />}
							</IconButton>
						</Grid>
						{/* Add new Income component and logic */}
						{open && <NewIncome setAddedIncome={setAddedIncome} />}
						{/* Render Income data */}
						{incomes.map((item, index) => {
							return (
								<IncomeDisplayer
									key={`${item.title}-${index}`}
									title={item.title}
									amount={item.amount}
									index={index}
									selected={selected}
									setSelected={setSelected}
								/>
							)
						})}
						{incomes.length === 0 && (
							<div
								style={{
									padding: 10,
									borderRadius: '5px',
									position: 'unset',
									border: `1px solid ${theme.palette.primary.main + '12'}`,
									background: theme.palette.background.default + '61',
								}}>
								<Typography>{labelIn('missing_data')}</Typography>
							</div>
						)}
					</Item>
				</Grid>
				<Grid item xs={9}>
					{/* create a graph for select income */}
				</Grid>
			</Grid>
		</Box>
	)
}

export default Income
