const Users = require('./../schemas/Users');
const createToken = require('./../utils/createToken');
const comparePasswords = require('./../utils/comparePasswords');

const Images = require('./../schemas/Images');

function signup(_, args, context, info) {
    return Users.create(args.data).then(user => {
        let token = createToken(user);

        return { token };
    }).catch(err => {
        throw err;
    });
}

function login(_, args, context, info) {
    return comparePasswords(args.email, args.password)
        .then(token => { return { token } } )
        .catch(err => { throw err });
}

function uploadImage(_, args, context, info) {

    if (!context.user) {
        throw new Error("Authentication required");
    }

    const {_id} = context.user;

    args.data.user_id = _id;

    return Images.create(args.data).then(image => {
        return "Image Created";
    }).catch(err => {
        throw err;
    });
}

module.exports = {
    signup,
    login,
    uploadImage
}
