const mongoose = require('mongoose');
const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    icon: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);