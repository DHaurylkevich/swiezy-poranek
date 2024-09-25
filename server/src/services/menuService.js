const Menu = require('../models/menu');

// Получение всего меню
exports.getMenu = async () => {
    return await Menu.find();
};

exports.getAllMenuIds = async () => {
    try {
        const menus = await Menu.find({}, {_id: 1});

        return menus
    } catch (error) {
        console.error('Error fetching menu IDs:', error);
        throw new Error('Could not fetch menu IDs');
    }
};


// Создание меню
exports.createMenu = async (menuData) => {
    const { menus } = menuData;
    const newMenu = new Menu({ menus });
    return await newMenu.save();
};

// Обновление меню на конкретный день
exports.updateDayMenu = async (id, dayMenuData) => {
    return await Menu.updateOne(
        { "menus._id": id },
        { $set: { "menus.$.mealtime": dayMenuData.mealtime } }
    );
};

// Удаление блюда
exports.deleteDish = async (id) => {
    return await Menu.findOneAndDelete({ _id: id });
};
