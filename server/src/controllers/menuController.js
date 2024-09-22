const Menu = require('../models/menu');

// Получение всего меню
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создание или обновление меню
exports.saveMenu = async (req, res) => {
    const { menus } = req.body;
    try {
        const newMenu = new Menu({ menus });
        await newMenu.save();
        res.status(201).json({ message: 'Menu saved successfully', newMenu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удаление блюда
exports.deleteDish = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findOneAndDelete(id);
        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
