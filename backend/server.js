// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

//Route Imports
const budgetRoutes = require('./routes/budgetRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const incomeRoutes = require('./routes/incomeRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
	console.log('request method->', req.method)
	console.log('request path->', req.path)
	next()
})

const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI
console.log(mongoURI)
// Connect to MongoDB
mongoose
	.connect(mongoURI, {})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB', err)
	})

// Serve static files from the React app in production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

// Routes
app.use('/api/budget', budgetRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/expense', expenseRoutes)
app.use('/api/income', incomeRoutes)

app.get('/', (req, res) => {
	res.send('Hello, World!')
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Catch-all handler for any request that doesn't match API routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
