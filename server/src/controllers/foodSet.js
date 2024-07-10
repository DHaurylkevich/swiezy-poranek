const FoodSet = require('../models/FoodSet');

// Создание нового зестава
exports.createFoodSet = async (req, res) => {
    const { name, description, price, photo, vegetarian, active } = req.body;
    try {
        const newFoodSet = new FoodSet({
            name,
            description,
            price,
            photo,
            vegetarian,
            active,
        });
        await newFoodSet.save();
        res.status(201).json(newFoodSet);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании зестава' });
    }
};

// Получение всех зеставов
exports.getAllFoodSets = async (req, res) => {
    try {
        const foodSets = await FoodSet.find();
        res.status(200).json(foodSets);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении зеставов' });
    }
};

// Получение зестава по ID
exports.getFoodSetById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodSet = await FoodSet.findById(id);
        if (!foodSet) {
            return res.status(404).json({ error: 'Зестав не найден' });
        }
        res.status(200).json(foodSet);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении зестава' });
    }
};

// Обновление зестава
exports.updateFoodSet = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, photo, vegetarian, active } = req.body;
    try {
        const updatedFoodSet = await FoodSet.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                photo,
                vegetarian,
                active,
            },
            { new: true }
        );
        res.status(200).json(updatedFoodSet);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении зестава' });
    }
};

// Удаление зестава
exports.deleteFoodSet = async (req, res) => {
    const { id } = req.params;
    try {
        await FoodSet.findByIdAndDelete(id);
        res.status(200).json({ message: 'Зестав удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении зестава' });
    }
};
