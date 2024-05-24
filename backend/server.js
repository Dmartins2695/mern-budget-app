// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')


dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
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
