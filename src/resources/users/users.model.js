const mongoose = require('mongoose');
// Define model schema
const userModelSchema = mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  password: String,
  username: String,
  following: []
});
// Compile model from schema
const UserModel = mongoose.model('UserModel', userModelSchema );
const create = (user) => {
    UserModel.create(user, function (err, instance) {
        if (err) return handleError(err);
        if (instance) {
            console.log(instance.name);
        }
      });
};
const get = (id) => {
    return UserModel
      .findOne({ "id": parseInt(id) })
      .exec(function (err, user) {
        if (err) return console.log(err);
        console.log('The user is %s', user);
        return user;
      });
}

const update = (id, updatedUser) => {
    let query = { 'id': id };
    UserModel.updateOne(query,
      updatedUser, 
      function (err, docs) { 
        if (err){ 
          console.log(err) 
        } 
        else{ 
          console.log("Updated Docs : ", docs); 
        } 
  }); 
  };
module.exports = {
    create,
    get,
    update,
  };