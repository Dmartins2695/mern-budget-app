import AddIcon from '@mui/icons-material/Add'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CssBaseline,
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
	styled,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'

const Item = styled(Paper)(({ theme, width, height }) => ({
	padding: 25,
	width: width,
	height: height,
	marginLeft: 3,
	background: theme.palette?.paperBackground.main,
	color: theme.palette?.primary.main,
}))

const IncomeDisplayer = ({ title, value }) => {
	return (
		<>
			<Accordion
				disableGutters
				elevation={0}
				sx={{
					background: '#ededed',
					position: 'unset',
				}}>
				<AccordionSummary sx={{ background: '#dadada', borderRadius: '5px' }}>
					<Grid container alignItems='center' justifyContent='space-between'>
						<Typography variant='body1' display='inline' color='primary'>
							{title}
						</Typography>
						<Typography variant='body2' display='inline' color='primary'>
							{value}
						</Typography>
					</Grid>
				</AccordionSummary>
				<AccordionDetails>{/* budgets basic info maybe */}</AccordionDetails>
			</Accordion>
		</>
	)
}

const Income = () => {
	const [incomes, setIncomes] = useState([])

	useEffect(() => {
		const getIncomes = async () => {
			const response = await axiosInstance.get('/api/income')
			setIncomes(response.data)
		}
		getIncomes()
	}, [])
	const handleAddIncome = () => {
		// possibly open new page with small form
	}

	return (
		<Box sx={{ p: 5 }}>
			<CssBaseline />
			<Grid container>
				<Grid item xs={4}>
					<Item width={400}>
						<Grid
							container
							alignItems={'center'}
							justifyContent={'space-between'}
							sx={{ pb: 2 }}>
							<Typography variant='h6' display='inline'>
								Incomes
							</Typography>
							<IconButton onClick={handleAddIncome}>
								<AddIcon />
							</IconButton>
						</Grid>
						{/* Add the Incomes */}
						<IncomeDisplayer title={'Salário'} value={'3,500€'} />
					</Item>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
		</Box>
	)
}

export default Income
