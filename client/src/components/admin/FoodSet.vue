<template>
    <div class="admin-foodset">
        <h2>Управление FoodSet</h2>

        <DynamicTable 
            :columns="columns" 
            :rows="rows" 
            @add="openModal('add')" 
            @edit="openModal('edit', $event)"
            @delete="openModal('delete', $event)" />

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3>{{ modalTitle }}</h3>
            </template>

            <template #body>
                <form v-if="currentAction !== 'delete'" @submit.prevent="handleSubmit">
                    <div v-for="(column, index) in columns" :key="index" class="form-group">
                        <label :for="column.toLowerCase()">{{ column }}</label>
                        <input v-if="column !== 'Описание' && column !== 'Состояние на сайте'" :id="column.toLowerCase()"
                            v-model="formData[columnToProperty(column)]" :type="getInputType(column)" required>
                        <textarea v-else-if="column === 'Описание'" :id="column.toLowerCase()"
                            v-model="formData.description"></textarea>
                        <select v-else :id="column.toLowerCase()" v-model="formData.isActive">
                            <option :value="true">Активно</option>
                            <option :value="false">Не активно</option>
                        </select>
                    </div>
                </form>
                <p v-else>
                    Вы уверены, что хотите удалить {{ currentRow.name }}?
                </p>
            </template>

            <template #footer>
                <button v-if="currentAction !== 'delete'" @click="handleSubmit">
                    {{ currentAction === 'edit' ? 'Сохранить' : 'Создать' }}
                </button>
                <button v-else @click="deleteFoodSet(currentRow.id)">Удалить</button>
                <button @click="closeModal">Отмена</button>
            </template>
        </AdminModal>
    </div>
</template>
  
<script>
import AdminModal from './AdminModal.vue';
import DynamicTable from '../DynamicTable.vue';

export default {
    name: 'AdminFoodSet',
    components: {
        AdminModal,
        DynamicTable
    },
    data() {
        return {
            columns: ["Название", "Фото", "Цена", "Описание", "Дата добавления", "Состояние на сайте", "Действия"],
            rows: [
                { id: 1, img: " ", name: 'Classic', price: '49,5 zł', description: 'Пустое', isActive: true },
                { id: 2, img: " ", name: 'XL', price: '59,5 zł', description: 'Пустое', isActive: true },
                { id: 3, img: " ", name: 'Настраиваемый', price: '90,6 zł', description: 'Пустое', isActive: false }
            ],
            showModal: false,
            currentAction: "",
            currentRow: null,
            formData: this.getEmptyFormData()
        };
    },
    computed: {
        modalTitle() {
            const titles = {
                add: 'Создание нового FoodSet',
                edit: 'Редактирование FoodSet',
                delete: 'Удалить FoodSet'
            };
            return titles[this.currentAction] || '';
        }
    },
    methods: {
        getEmptyFormData() {
            return {
                img: "",
                name: "",
                price: "",
                description: "",
                isActive: true
            };
        },
        openModal(action, row = null) {
            this.currentAction = action;
            this.currentRow = row;

            if (action === "edit") {
                this.formData = { ...row };
            } else if (action === "add") {
                this.formData = this.getEmptyFormData();
            }

            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.currentAction = "";
            this.currentRow = null;
            this.formData = this.getEmptyFormData();
        },
        handleSubmit() {
            if (this.currentAction === "edit") {
                this.updateFoodSet();
            } else {
                this.createFoodSet();
            }
        },
        createFoodSet() {
            console.log('Создание нового FoodSet:', this.formData);
            // Здесь должна быть логика создания нового FoodSet
            this.closeModal();
        },
        updateFoodSet() {
            console.log('Обновление FoodSet:', this.formData);
            // Здесь должна быть логика обновления FoodSet
            this.closeModal();
        },
        deleteFoodSet(id) {
            console.log("Удаление FoodSet:", id);
            this.rows = this.rows.filter(item => item.id !== id);
            this.closeModal();
        },
        columnToProperty(column) {
            const map = {
                "Название": "name",
                "Фото": "img",
                "Цена": "price",
                "Описание": "description",
                "Состояние на сайте": "isActive"
            };
            return map[column] || column.toLowerCase();
        },
        getInputType(column) {
            if (column === "Цена") return "number";
            if (column === "Фото") return "url";
            return "text";
        }
    }
};
</script>
  
<style scoped>
.admin-foodset {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background-color: #45a049;
}

button:last-child {
    margin-right: 0;
}
</style>