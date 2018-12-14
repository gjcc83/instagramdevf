const Users = require('./../schemas/Users');
const createToken = require('./../utils/createToken');
const comparePasswords = require('./../utils/comparePasswords');

const Images = require('./../schemas/Images');
const Comments = require('./../schemas/Comments');

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

function addComment(_, args, context, info) {

    if (!context.user) {
        throw new Error("Authentication required");
    }

    const {_id} = context.user;    
    const imageId = args.data.image_id;

    const comment = {
        description: args.data.description,
        user_id: _id
    };

    return Comments.create(comment).then(docComment => {
        return Images.findById(imageId)
                     .populate('user_id')
                     .populate('comment_id').then(image => {
            image.comment_id.push(docComment);
            return Images.findByIdAndUpdate(imageId, { $set : image }).then(docImage => {
                return docComment.toObject();
            });
        });
    }).catch(err => {
        throw err;
    });
}

function addLike(_, args, context, info) {

    if (!context.user) {
        throw new Error("Authentication required");
    }

    const imageId = args.data;

    return Images.findById(imageId)
                 .populate('user_id')
                 .populate('comment_id').then(image => {
        image.likes_quantity = image.likes_quantity + 1;
        return Images.findByIdAndUpdate(imageId, { $set : image }, { new : true }).then(docImage => {
            return docImage.toObject();
        }).catch(err => {
            throw Error("Publicación No Existe");    
        });
    }).catch(err => {
        throw Error("Publicación No Existe");
    });
}

module.exports = {
    signup,
    login,
    uploadImage,
    addComment,
    addLike
}
