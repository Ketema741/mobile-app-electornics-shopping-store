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
		required: true
	},
	description: {
		type: String,
		required: true

	},
	productImages: {
		type: [Object],
	},

	price: {
		type: Number,
		required: true
	},

	relatedProduct: {
		type: [Object],

	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Product', ContactSchema);