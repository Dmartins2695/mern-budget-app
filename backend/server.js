// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const { keycloak, setupKeycloak } = require('./middleware/keycloak')
const addUserToRequest = require('./middleware/addUserToRequest')
const { setupRoutes } = require('./routes/routesIndex')
const { createParentCategories } = require('./controllers/utils')

dotenv.config()

// Kube cluster code
/* const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI */

//local development
const PORT = 5000
const mongoURI = process.env.MONGO_KUBE_URI

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
setupKeycloak(app)
app.use(addUserToRequest)
app.use((req, res, next) => {
	console.log('request method->', req.method)
	console.log('request path->', req.path)
	next()
})
setupRoutes(app, keycloak)

app.get('/', (req, res) => {
	res.send('Hello, World!')
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Catch-all handler for any request that doesn't match API routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Connect to MongoDB
mongoose
	.connect(mongoURI, {})
	.then(() => {
		createParentCategories()
		console.log(`Connected to MongoDB ${mongoURI}`)
	})
	.catch((err) => {
		console.error(`Error connecting to MongoDB uri:${mongoURI}`, err)
	})

// Start the server

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
