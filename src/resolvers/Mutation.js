const Users = require('./../schemas/Users');
const createToken = require('./../utils/createToken');
const comparePasswords = require('./../utils/comparePasswords');

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

module.exports = {
    signup,
    login
}
