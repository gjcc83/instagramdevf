const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

const UserSchema = new Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true        
    },
    birth_date:{
        type:Date
    },
    gender:{
        type:String,
        enum:["MALE", "FEMALE"]
    },
    image_id:[{
        type:Schema.Types.ObjectId, ref: "imagesInstagram"
    }],
    is_active:{
        type:Boolean,
        default:true
    }
}, {'collection': 'usersInstagram', timestamps: true})

UserSchema.pre('save', function(next){
    let user = this

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidate, cb) {

    bcrypt.compare(candidate, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('usersInstagram', UserSchema)
