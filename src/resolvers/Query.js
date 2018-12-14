const Users = require('../schemas/Users');
const Images = require('../schemas/Images');

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

function images(_, args, context, info) {
    if (!context.user) {
        throw new Error('Authentication required');
    }

    return Images.find({is_active:true})
                 .populate('user_id')
                 .populate('comment_id').then(docImages => {
        return docImages;
    }).catch(err => {
        throw err;
    });
}

module.exports = {
    prueba,
    me,
    images
}
