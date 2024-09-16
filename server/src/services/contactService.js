const Contact = require("../models/Contact");

// Получение всех контактов
exports.getAllContacts = async () => {
    return await Contact.find();
};

// Получение контакта по ID
exports.getContactById = async (id) => {
    return await Contact.findById(id);
};

// Создание нового контакта
exports.createContact = async (data) => {
    const contact = new Contact(data);
    return await contact.save();
};

// Обновление контакта
exports.updateContact = async (id, data) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Удаление контакта
exports.deleteContact = async (id) => {
    return await Contact.findByIdAndDelete(id);
};