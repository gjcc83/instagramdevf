const Users = require('../schemas/Users');

function prueba(_, args, context, info) {
    return "Esto es una prueba en GraphQL"
}

function me(_, args, context, info) {
    if (!context.user) {
        throw new Error('Authentication required');
    }

    return Users.findById(context.user._id)
        .populate('image_id').then(user => {
            return user.toObject();
        }).catch(err => {
            throw err;
        });
}

module.exports = {
    prueba,
    me
}
