<template>
    <div class="admin-foodset">
        <h2>Управление FoodSet</h2>

        <button @click="openCreateModal" class="btn-create">Создать новый FoodSet</button>

        <table>
            <thead>
                <tr>
                    <th>Фото</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Описание</th>
                    <th>Дата добавления</th>
                    <th>Состояние на сайте</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="foodSet in foodSets" :key="foodSet.id">
                    <td>{{ foodSet.img }}</td>
                    <td>{{ foodSet.name }}</td>
                    <td>{{ foodSet.price }}</td>
                    <td>{{ foodSet.description }}</td>
                    <td>{{ foodSet.dateAdded }}</td>
                    <td>{{ foodSet.isActive ? 'Активен' : 'Не активен' }}</td>
                    <td>
                        <!-- Кнопки действий: редактирование и удаление -->
                        <button @click="openEditModal(foodSet)">Редактировать</button>
                        <button @click="deleteFoodSet(foodSet.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Модальное окно для создания и редактирования FoodSet -->
        <FoodSetModal ref="foodSetModal" @foodSetSaved="refreshFoodSets" />
    </div>
</template>

<script>
import FoodSetModal from './FoodSetModal.vue'; 

export default {
    components: {
        FoodSetModal
    },
    data() {
        return {
            foodSets: [
                { id: 1, img: " ", name: 'Classic', price: '49,5 zł', description: 'Пустое', dateAdded: '01.07.2024', isActive: true },
                { id: 2, img: " ", name: 'XL', price: '59,5 zł', description: 'Пустое', dateAdded: '02.07.2024', isActive: true },
                { id: 3, img: " ", name: 'Настраиваемый', price: '90,6 zł', description: 'Пустое', dateAdded: '03.07.2024', isActive: false }
            ]
        };
    },
    methods: {
        openCreateModal() {
            this.$refs.foodSetModal.openModalForCreate();
        },
        openEditModal(foodSet) {
            this.$refs.foodSetModal.openModalForEdit(foodSet);
        },
        deleteFoodSet(id) {
            // Логика удаления FoodSet
            // В реальном приложении здесь будет вызов API для удаления записи
            console.log(`FoodSet с id ${id} удален`);
            // После удаления обновляем список FoodSet
            this.foodSets = this.foodSets.filter(item => item.id !== id);
        },
        refreshFoodSets() {
            // В этом методе можно обновлять список FoodSet после сохранения изменений
            // В реальном приложении можно обновить данные из API или локального хранилища
            console.log('Обновление списка FoodSet');
        }
    }
};
</script>
  
<style scoped>
.admin-foodset {
    padding: 20px;
}

.btn-create {
    margin-bottom: 10px;
    display: inline-block;
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

table th {
    background-color: #f0f0f0;
}
</style>
  