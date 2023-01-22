const mongoose = require ('mongoose')

const UserSchema = mongoose.Schema ({
    type: {
        type:String,
        default:"user"
    },
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    address: { 
        type:String,
        required:true
    },

    favourites: {
        type: [Object],
        default:[]
    },
    userImage: {
		type: [Object],
        default:[]
	},
    cart: {
		type: [Object],
        default:[]
	},
    date: {
        type: Date,
       default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema);
