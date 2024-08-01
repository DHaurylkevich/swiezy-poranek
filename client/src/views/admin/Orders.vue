<template>
    <div class="admin-orders">
        <h1>Управление заказами</h1>

        <section class="statistics">
            <div class="stat-card">Общее количество заказов: {{ totalOrders }}</div>
            <div class="stat-card">Общее количество пользователей: {{ totalUsers }}</div>
            <div class="stat-card">Общий доход: {{ totalRevenue }}</div>
        </section>

        <DynamicTable 
            :columns="columns" 
            :rows="rows" 
            :editBtn="false"
            @delete="openModal($event)" 
        />

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3>Delete</h3>
            </template>

            <template #body>
                <p>Вы уверены, что хотите удалить от {{ currentRow.name }}?</p>
            </template>

            <template #footer>
                <button @click="deleteOrder(currentRow.id)">Удалить</button>
                <button @click="closeModal">Отмена</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from '@/components/Modal.vue';
import DynamicTable from '@/components/DynamicTable.vue';
//import orderService from '../../services/orderService'; // Подключаем сервис для работы с API


export default {
    name: 'AdminOrders',
    components: {
        AdminModal,
        DynamicTable
    },
    data() {
        return {
            columns: ["id", "Имя клиента", "Email", "Телефон", "Адрес", "Товары", "Общая стоимость", "Дата заказа", "Действия"],
            rows: [
                { id: 1, name: 'Classic', email: "@", tel: "+48", address: "ul", foodSet: "foodSet", price: '49,5 zł', dataOrder: 'Пустое'},
                { id: 2, name: 'XL', email: "@", tel: "+48", address: "ul", foodSet: "foodSet", price: '59,5 zł', dataOrder: 'Пустое'},
                { id: 3, name: 'Настраиваемый', email: "@", tel: "+48", address: "ul",foodSet: "foodSet", price: '90,6 zł', dataOrder: 'Пустое'}
            ],
            showModal: false,
            currentRow: null,
            totalOrders: null,
            totalUsers: null,
            totalRevenue: null
        }
    },
    methods:{
        openModal(row = null){
            this.showModal = true;
            this.currentRow = row;
        },
        closeModal(){
            this.currentRow = null;
            this.showModal = false;
        },
        deleteFoodSet(id){
            console.log("Del", id);
            this.rows = this.rows.filter(item => item.id !== id);
            this.closeModal()
        }
    }
}
</script>

<style scoped>
.admin-orders {
    padding: 20px;
}

.statistics{
    margin-top: 15px;

}

.stat-card{
    margin-top: 5px;
}

</style>