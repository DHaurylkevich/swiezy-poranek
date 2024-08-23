const FoodSet = require('../models/FoodSet');

// Создание нового набора
exports.createFoodSet = async (req, res) => {
    const { name, description, price, photo, vegetarian, active } = req.body;
    try {
        // Валидация входных данных
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Все обязательные поля должны быть заполнены' });
        }
        
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
        res.status(500).json({ error: 'Ошибка при создании набора' });
    }
};

// Получение всех наборов
exports.getAllFoodSets = async (req, res) => {
    try {
        const foodSets = await FoodSet.find();
        res.status(200).json(foodSets);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении наборов' });
    }
};

// Получение набора по ID
exports.getFoodSetById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodSet = await FoodSet.findById(id);
        if (!foodSet) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json(foodSet);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении набора' });
    }
};

// Обновление набора
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
            { new: true, runValidators: true } // Запуск валидаторов при обновлении
        );
        if (!updatedFoodSet) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json(updatedFoodSet);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении набора' });
    }
};

// Удаление набора
exports.deleteFoodSet = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFoodSet = await FoodSet.findByIdAndDelete(id);
        if (!deletedFoodSet) {
            return res.status(404).json({ error: 'Набор не найден' });
        }
        res.status(200).json({ message: 'Набор удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении набора' });
    }
};
