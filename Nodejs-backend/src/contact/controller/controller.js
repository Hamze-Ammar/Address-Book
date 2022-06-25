const { addContact, getById } = require("../service");
const User = require("../../../model/User");
const Contact = require("../../../model/Contact");

async function add(req, res) {
  try {
    console.log(req.body);

    const newContact = await addContact(req.body);
    console.log("newConact =>", newContact);

    // Should add userID here
    // We're gonna skipt it for now
    const updateUser = await User.updateOne(
      {
        _id: newContact.user,
      },
      {
        $push: {
          contacts: newContact._id,
        },
      }
    );
    console.log("udpatedContact=>", updateUser);

    return res.status(200).send(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function get(req, res) {
  try {
    console.log(req.query);

    if (req.query.id) {
      // ?id=k1231 -> query paramet
      const id = req.query.id;
      const result = await getById(id);
      console.log("result of specific user =>", result);
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(req, res) {
  try {
    const contact = await Contact.findOne({ _id: req.query.id });
    // if !product return -> 404

    const deleteResult = await contact.remove();
    // deleteResult -> 400

    await User.updateOne(
      { _id: contact.user },
      { $pull: { contacts: contact._id } }
    );

    return res.send("product removed: ");
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(req, res) {
    try {
        const contact = await Contact.findByIdAndUpdate({_id: req.query.id},
            {
                $set: {
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    relationship: req.body.relationship,
                    email: req.body.email,
                    location: req.body.location,
                }
            });
        return res.send("Contact has been updated");
    }catch (error) {
        console.log(error);
    }
}

module.exports = {
  add,
  get,
  removeContact,
  updateContact,
};