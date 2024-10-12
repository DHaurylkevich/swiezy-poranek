<template>
    <div class="admin-orders">
        <h1 class="header">Управление заказами</h1>

        <section class="orders">
            <div class="order-card" v-for="(order, index) in rows" :key="order.id" @click="openModal(order)">
                <div class="main-info">
                    <h4>{{ order.fullName }}</h4>
                    <p class="order-status" :class="order.status.toLowerCase()">{{ order.status }}</p>
                </div>
                <div class="order-details">
                    <p><strong>Email:</strong> {{ order.email }}</p>
                    <p><strong>Telefone:</strong> {{ order.phone }}</p>
                    <p><strong>Address:</strong> {{ order.address }}</p>
                    <p><strong>Cena:</strong> {{ order.fullPrice }}</p>
                    <p><strong>Data zamówienia:</strong> {{ order.createdAt }}</p>
                </div>
            </div>
        </section>

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3 class="modal-header">Informacja o zamówieniu</h3>
            </template>

            <template #body>
                <div v-if="currentRow">
                    <div class="modal-info">
                        <p><strong>Imie Nazwisko:</strong> {{ currentRow.name }}</p>
                        <p><strong>Email:</strong> {{ currentRow.email }}</p>
                        <p><strong>Telefon:</strong> {{ currentRow.phone }}</p>
                        <p><strong>Address:</strong> {{ currentRow.address }}</p>
                        <p><strong>Cena:</strong> {{ currentRow.fullPrice }}</p>
                        <p><strong>Data zamówienia</strong> {{ currentRow.createdAt }}</p>
                        <select v-model="selectedItem">
                            <option :value="selectedItem" disabled>{{ selectedItem }}</option>
                            <option v-for="status in listStatus" :key="status.id" :value="status">{{ status }}</option>
                        </select>
                        <button @click="sendData(currentRow._id)">Zmienić status</button>
                    </div>
                    <h4>Zestawy:</h4>
                    <ul class="items-list">
                        <li v-for="item in currentRow.items" :key="item.id" class="inf-package">
                            <p><strong>{{ item.title }} ({{ item.type }})</strong> - {{ item.price }}</p>
                            <ul class="dishes-list">
                                <li v-for="(group, day) in groupDishesByDay(item.dishes)" :key="day">
                                    <strong>{{ day }}:</strong>
                                    <ul>
                                        <li v-for="dish in group" :key="dish.index">{{ dish.name || dish.type }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </template>

            <template #footer>
                <button class="mini-btn" @click="closeModal">Zamknij</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from '@/components/ui/Modal.vue';
import { getOrders, updateOrderStatus } from "@/services/orderServices";


export default {
    name: "AdminOrders",
    components: {
        AdminModal
    },
    data() {
        return {
            columns: ["id", "Имя клиента", "Email", "Телефон", "Адрес", "Товары", "Общая стоимость", "Дата заказа", "Действия"],
            rows: [],
            showModal: false,
            currentRow: null,
            totalOrders: null,
            totalUsers: null,
            totalRevenue: null,
            selectedItem: "",
            listStatus: ["Nowe zamówienie", "W trakte", "Nie aktualne"]
        }
    },
    async created() {
        this.loadAllOrder();
    },
    methods: {
        openModal(row = null) {
            this.showModal = true;
            this.currentRow = row;
            this.selectedItem = row.status ? row.status : "Wybierz status";
        },
        closeModal() {
            this.currentRow = null;
            this.showModal = false;
            this.selectedItem = "";
        },
        async loadAllOrder() {
            try {
                this.rows = await getOrders();
            } catch (e) {
                console.error("Failed to load menu's ids:", e);
            }
        },
        async sendData(id) {
            console.log(this.selectedItem);
            await updateOrderStatus(id, {status: this.selectedItem});
            await this.loadAllOrder();
        },
        deleteFoodSet(id) {
            console.log("Del", id);
            this.rows = this.rows.filter(item => item.id !== id);
            this.closeModal()
        },
        formatDays(days) {
            const dayNames = {
                "Poniedziałek": "Pon",
                "Wtorek": "Wto",
                "Środa": "Śro",
                "Czwartek": "Czw",
                "Piątek": "Pią",
            };

            const formattedDays = days.map(day => dayNames[day] || day);
            return formattedDays.join(", ");
        },
        groupDishesByDay(dishes) {
            return dishes.reduce((acc, dish) => {
                if (!acc[dish.day]) {
                    acc[dish.day] = [];
                }
                acc[dish.day].push(dish);
                return acc;
            }, {});
        }
    }
}
</script>

<style scoped>
.admin-orders {
    padding: 20px;
}

.header {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.orders {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.order-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--primary-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    background-color: white;
}

.main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-status {
    font-weight: bold;
}

.order-details {
    padding-top: 10px;
    color: #555;
}

.items-list {
    padding: 0;
    list-style: none;
    margin: 0;
}

.inf-package {
    margin-bottom: 10px;
}

.dishes-list {
    margin-top: 5px;
    padding-left: 20px;
}

.order-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
    font-size: 1.5em;
    margin-bottom: 15px;
}

.modal-info {
    margin-bottom: 15px;
}

.mini-btn {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-weight: bold;
    color: var(--background-color);
    padding: 10px 15px;
    cursor: pointer;
}

.mini-btn:hover {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}
</style>