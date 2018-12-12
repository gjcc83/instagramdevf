const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({

    likes_quantity: {
        type:Number,
        default: 0
    },
    comment_id: [{
        type:Schema.Types.ObjectId, ref: "comments"
    }],
    url: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    is_active: {
        type:Boolean,
        default:true
    }
}, {'collection': 'imagesInstagram', timestamps: true})

module.exports = mongoose.model('imagesInstagram', ImageSchema)
