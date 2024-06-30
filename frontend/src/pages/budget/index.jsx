import React, { useState } from 'react'
import IncomeDroplist from '../../components/incomeDroplist'
import { Button, Grid, Typography } from '@mui/material'
import useDictionary from '../../hooks/useDictionary'
import NewBudget from './components/newBudget'

const Budget = () => {
	const [selectedIncome, setSelectedIncome] = useState(null)
	const [openAdd, setOpenAdd] = useState(false)
	const { labelIn } = useDictionary()

	const handleOpen = () => {
		setOpenAdd((prev) => !prev)
	}

	return (
		<div>
			<Typography variant='h4'>{labelIn('menu_item_budget')}</Typography>
			<div style={{ padding: 25 }}>
				<Grid container alignContent={'center'} justifyContent={'space-between'}>
					<Grid item xs>
						<IncomeDroplist setSelected={setSelectedIncome} />
					</Grid>
					<Grid
						container
						item
						xs
						alignContent={'center'}
						justifyContent={'flex-end'}>
						{selectedIncome && (
							<Button
								sx={{ ml: 2 }}
								onClick={handleOpen}
								color={'primary'}
								variant={'text'}
								size={'small'}>
								{labelIn('open_add_transaction')}
							</Button>
						)}
					</Grid>
				</Grid>
				<NewBudget
					selectedIncome={selectedIncome}
					setOpenAdd={setOpenAdd}
					handleOpen={handleOpen}
					openAdd={openAdd}
				/>
			</div>
		</div>
	)
}

export default Budget
