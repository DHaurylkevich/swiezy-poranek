const Contact = require("../models/Contact");

exports.getAllContacts = async () => {
    return await Contact.find();
};

exports.getContactById = async (id) => {
    return await Contact.findById(id);
};

exports.createContact = async (data) => {
    const contact = new Contact(data);
    return await contact.save();
};

exports.updateContact = async (id, data) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.deleteContact = async (id) => {
    return await Contact.findByIdAndDelete(id);
};