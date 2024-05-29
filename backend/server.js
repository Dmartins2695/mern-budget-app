// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const { keycloak, memoryStore } = require('./middleware/keycloak')

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
app.use(
	session({
		secret: 'some secret key', // Use a strong secret key
		resave: false,
		saveUninitialized: true,
		store: memoryStore,
	}),
)
// Keycloak middleware
app.use(keycloak.middleware())

// Protect all routes by default
app.use(keycloak.protect())

let mongoURI = process.env.MONGO_URL || process.env.MONGO_URI
if (process.env.MONGO_KUBE_URI) {
	mongoURI = process.env.MONGO_KUBE_URI
}
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

/* // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Catch-all handler for any request that doesn't match API routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
}) */

// Start the server
//let PORT = process.env.PORT || 4000
let PORT = 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
