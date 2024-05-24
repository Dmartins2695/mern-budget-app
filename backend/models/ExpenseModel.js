const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
    title: {
        type:String,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)