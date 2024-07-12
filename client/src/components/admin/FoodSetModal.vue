<template>
    <div class="foodset-modal">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on }">
                <router-link to="/admin/foodset/create" class="btn-create" v-on="on">Создать новый FoodSet</router-link>
            </template>
            <v-card>
                <v-card-title v-if="isNew">Создание нового FoodSet</v-card-title>
                <v-card-title v-else>Редактирование FoodSet</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="saveFoodSet">
                        <v-text-field v-model="form.name" label="Название"></v-text-field>
                        <v-text-field v-model="form.price" label="Цена"></v-text-field>
                        <v-textarea v-model="form.description" label="Описание"></v-textarea>
                        <input type="file" @change="handleFileUpload" accept="image/*" v-if="isNew">
                        <img :src="imageUrl" v-if="form.imageUrl" style="max-width: 100%; margin-top: 10px;">
                        <!-- Дополнительные поля по вашему выбору -->
                        <v-btn type="submit" color="primary">Сохранить</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            dialog: false,
            isNew: true,
            form: {
                id: null,
                name: '',
                price: '',
                description: '',
                imageUrl: null // Поле для хранения URL изображения
            },
            imageUrl: '' // Переменная для отображения текущего изображения
        };
    },
    methods: {
        openModalForCreate() {
            this.isNew = true;
            this.resetForm();
            this.dialog = true;
        },
        openModalForEdit(foodSet) {
            this.isNew = false;
            this.form = {
                id: foodSet.id,
                name: foodSet.name,
                price: foodSet.price,
                description: foodSet.description,
                imageUrl: foodSet.imageUrl // Загружаем URL изображения, если оно уже есть
            };
            this.dialog = true;
        },
        saveFoodSet() {
            // Логика сохранения FoodSet
            // В реальном приложении здесь нужно добавить логику отправки данных на сервер или сохранения локально
            console.log('FoodSet сохранен:', this.form);
            // Добавляем обработку изображения (если необходимо)
            // В реальном приложении нужно загружать изображение и получать его URL
            // Здесь мы просто выводим в консоль URL изображения для примера
            if (this.isNew && this.form.imageUrl) {
                console.log('Изображение загружено:', this.form.imageUrl);
            }
            // Сбрасываем форму и закрываем модальное окно
            this.resetForm();
            this.dialog = false;
            // Оповещаем родительский компонент о сохранении FoodSet
            this.$emit('foodSetSaved');
        },
        resetForm() {
            this.form = {
                id: null,
                name: '',
                price: '',
                description: '',
                imageUrl: null
            };
            this.imageUrl = '';
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // В реальном приложении нужно загрузить файл на сервер и получить URL
                // Здесь мы просто используем FileReader для отображения изображения в предварительном просмотре
                const reader = new FileReader();
                reader.onload = () => {
                    this.form.imageUrl = reader.result;
                    this.imageUrl = reader.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
};
</script>
  
<style scoped>
.foodset-modal {
    text-align: center;
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
</style>
  