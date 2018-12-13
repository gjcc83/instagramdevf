const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    
    description: {
        type:String,
        required:true
    },
    is_active: {
        type:Boolean,
        default:true
    },
    user_id: {
        type:Schema.Types.ObjectId, ref: "usersInstagram"
    }
}, {'collection': 'commentsInstagram', timestamps: true})

module.exports = mongoose.model('commentsInstagram', CommentsSchema)
