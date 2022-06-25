const User = require('../../model/User');

async function getUsers() {
  return await User.find();
  // return await Task.find().populate('user');
}

async function getById(id) {
  return await User.findById(id).populate('tasks');
}

async function addUser(body, hashPassword) {
  const {
    name,
    email,
    address, // Added hamze
  } = body;

  const user = new User({
    name,
    email,
    address, // Added hamze
    password: hashPassword,
    
  });

  return await user.save();
}

async function getByEmail(email) {
  return await User.findOne({
    email
  });
}

module.exports = {
  getUsers,
  getById,
  addUser,
  getByEmail,
}