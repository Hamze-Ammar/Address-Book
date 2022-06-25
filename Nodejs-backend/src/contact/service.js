const Contact = require('../../model/Contact');
const User = require('../../model/User');


async function addContact(body) {
    const {
      fullName,
      phoneNumber,
      relationship,
      email,
      location,
      user,
    } = body;
  
    const contact = new Contact({
      fullName,
      phoneNumber,
      relationship,
      email,
      location,
      user,
    });
  
    return await contact.save();
  }

  async function getById(user_id) {
    // projection, in case you want to return certain values
    return await Contact.find({user: user_id});
  }

  async function getByContactId(id) {
    // projection, in case you want to return certain values
    return await Contact.findById(id);
  }


  module.exports = {
    addContact,
    getById,
    getByContactId,
  }