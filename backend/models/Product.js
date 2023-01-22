const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'admin'
	},

	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		// required: true
	},
	description: {
		type: String,
		required: true

	},
	url: {
		type: String,
		required: true
	},

	price: {
		type: Number,
		required: true
	},

	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Product', ContactSchema);