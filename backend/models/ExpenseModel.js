const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)