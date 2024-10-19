const menuService = require('../services/menuService');

exports.getMenu = async (req, res) => {
    try {
        const menu = await menuService.getMenu();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMenuIdsController = async (req, res) => {
    try {
        const menuIds = await menuService.getAllMenuIds();
        res.status(200).json({ menuIds });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu IDs' });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const newMenu = await menuService.createMenu(req.body);
        res.status(201).json({ message: 'Menu saved successfully', newMenu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatedDayMenu = async (req, res) => {
    try {
        const updated = await menuService.updateDayMenu(req.params.id, req.body);
        res.status(201).json({ message: 'Menu updated successfully', updated });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.deleteDish = async (req, res) => {
    try {
        await menuService.deleteDish(req.params.id);
        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
