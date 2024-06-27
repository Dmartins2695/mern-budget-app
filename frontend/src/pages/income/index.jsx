import { useTheme } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, IconButton, Paper, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIncomes } from '../../feature/data/incomeSlice'
import useDictionary from '../../hooks/useDictionary'
import { makeRequest } from '../../utils/resquestTemplate'
import { IncomeDisplayer } from './components/incomeDisplayer'
import { NewIncome } from './components/newIncome'


const Item = styled(Paper)(({ theme, width, height }) => ({
	padding: 25,
	width: width,
	height: height,
	marginLeft: 3,
}))

const Income = () => {
	const { incomes } = useSelector((state) => state.incomes)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const theme = useTheme()
	const { labelIn } = useDictionary()
	const [selected, setSelected] = useState(null)

	const getIncomes = async () => {
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


	useEffect(() => {
		getIncomes()
	}, [])

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
								<AddIcon />
							</IconButton>
						</Grid>
						{/* Add new Income component and logic */}
						<NewIncome
							getIncomes={getIncomes}
							open={open}
							handleModal={handleAddIncome}
						/>
						{/* Render Income data */}
						<IncomeDisplayer
							incomes={incomes}
							selected={selected}
							setSelected={setSelected}
						/>
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
