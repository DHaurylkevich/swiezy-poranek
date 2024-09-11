const contactService = require("../services/contactService");

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await contactService.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Контакт не найден' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Создание нового контакта
exports.createContact = async (req, res) => {
    try {
        const newContact = await contactService.createContact(req.body);
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Обновление контакта
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await contactService.updateContact(req.params.id, req.body);
        if (!updatedContact) {
            return res.status(404).json({ error: 'Контакт не найден' });
        }
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Удаление контакта
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await contactService.deleteContact(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Контакт не найден' });
        }
        res.status(200).json({ message: 'Контакт удален' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};