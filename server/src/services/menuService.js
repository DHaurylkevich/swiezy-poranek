const Menu = require("../models/menu");

// Создание нового меню
exports.createMenu = async (data) => {
    const menu = new Menu(data);
    return await menu.save();
};

// Получение всех меню
exports.getAllMenus = async () => {
    const menus = await Menu.find().populate('package').lean();
    return menus;
};

// Получение меню по ID
exports.getMenuById = async (id) => {
    const menu = await Menu.findById(id).populate('package').lean();
    return menu;
};

// Обновление меню
exports.updateMenu = async (id, data) => {
    const updatedMenu = await Menu.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return updatedMenu;
};

// Удаление меню
exports.deleteMenu = async (id) => {
    return await Menu.findByIdAndDelete(id);
};