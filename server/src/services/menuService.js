const Menu = require('../models/menu');

exports.getMenu = async () => {
    return await Menu.find();
};

exports.getAllMenuIds = async () => {
    try {
        const menus = await Menu.find({}, {_id: 1, position: 1});

        return menus
    } catch (error) {
        console.error('Error fetching menu IDs:', error);
        throw new Error('Could not fetch menu IDs');
    }
};

exports.createMenu = async (menuData) => {
    const { menus } = menuData;
    const newMenu = new Menu({ menus });
    return await newMenu.save();
};

exports.updateDayMenu = async (id, dayMenuData) => {
    return await Menu.updateOne(
        { "menus._id": id },
        { $set: { "menus.$.mealtime": dayMenuData.mealtime } }
    );
};

exports.deleteDish = async (id) => {
    return await Menu.findOneAndDelete({ _id: id });
};
