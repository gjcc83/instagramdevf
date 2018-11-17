const Users = require('../schemas/Users');
const createToken = require('../utils/createToken');

module.exports = (email, password) => {

    return new Promise((resolve, reject) => {

        Users.findOne({email:email}).then((user) => {
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch) {
                    resolve(createToken(user));
                } else {
                    reject(new Error("Password Does not Match"));
                }
            });
        }).catch((err) => {
            reject(err);
        });
    });
};
