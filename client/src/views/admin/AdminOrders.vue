<template>
    <div class="admin-orders">
        <h1 class="header">Zamówienia</h1>

        <section class="orders">
            <div class="order-card" v-for="(order, index) in rows" :key="order.id" @click="openOrderModal(order)">
                <div class="main-info">
                    <h4>{{ order.fullName }}</h4>
                    <p class="order-status" :class="order.status.toLowerCase()">{{ order.status }}</p>
                </div>
                <div class="order-details">
                    <p v-if="order.email"><strong>Email:</strong> {{ order.email }}</p>
                    <p><strong>Telefone:</strong> {{ order.phone }}</p>
                    <p><strong>Address:</strong> {{ order.address }}</p>
                    <p><strong>Cena:</strong> {{ order.fullPrice }}</p>
                    <p><strong>Data zamówienia:</strong> {{ order.createdAt }}</p>
                </div>
                <button @click.stop="openDeleteModal(order._id)" class="mini-btn">Usuń</button>
            </div>
        </section>

        <AdminModal :is-visible="showModalDelete" @close="closeDeleteModal">
            <template #header>
                <h3 class="modal-header">Usuniencie zamówienia</h3>
            </template>

            <template #body>
                <p>Czy napewno usunąć?</p>
            </template>

            <template #footer>
                <button class="mini-btn" @click="confirmDeleteOrder">Usuń</button>
            </template>
        </AdminModal>

        <!-- Модальное окно для информации о заказе -->
        <AdminModal :is-visible="showModal" @close="closeOrderModal">
            <template #header>
                <h3 class="modal-header">Informacja o zamówieniu</h3>
            </template>

            <template #body>
                <div v-if="currentRow">
                    <div class="modal-info">
                        <p><strong>Imie Nazwisko:</strong> {{ currentRow.fullName }}</p>
                        <p v-if="currentRow.email"><strong>Email:</strong> {{ currentRow.email }}</p>
                        <p><strong>Telefon:</strong> {{ currentRow.phone }}</p>
                        <p><strong>Address:</strong> {{ currentRow.address }}</p>
                        <p><strong>Cena:</strong> {{ currentRow.fullPrice }}</p>
                        <p><strong>Data zamówienia:</strong> {{ currentRow.createdAt }}</p>
                        <select v-model="selectedItem">
                            <option :value="selectedItem" disabled>{{ selectedItem }}</option>
                            <option v-for="status in listStatus" :key="status.id" :value="status">{{ status }}</option>
                        </select>
                        <button @click="sendData(currentRow._id)">Zmienić status</button>
                        <ul v-for="item in currentRow.items">
                            <li>
                                <p>Zestaw: {{ item.title }}</p>
                                <p>Cena: {{ item.price }}</p>
                                <div v-for="(dishes, day) in groupByDay(item.dishes)" :key="day">
                                    <span class="dish-day">{{ day }}:</span>
                                    <ul class="dishes-list">
                                        <li v-for="dish in dishes" :key="dish">{{ dish }}</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>

            <template #footer>
                <button class="mini-btn" @click="closeOrderModal">Zamknij</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from '@/components/ui/Modal.vue';
import { getOrders, updateOrderStatus, deleteOrder } from "@/services/orderServices";


export default {
    name: "AdminOrders",
    components: {
        AdminModal
    },
    data() {
        return {
            rows: [],
            showModal: false,
            showModalDelete: false,
            currentRow: null,
            orderToDelete: null,
            selectedItem: "",
            listStatus: ["Nowe zamówienie", "W trakte", "Nie aktualne"]
        }
    },
    async created() {
        this.loadAllOrder();
    },
    methods: {
        groupByDay(dishes) {
            const groupedByDay = {};

            dishes.forEach(dish => {
                const day = dish.day;
                if (!groupedByDay[day]) {
                    groupedByDay[day] = [];
                }
                groupedByDay[day].push(dish.name || dish.type);
            });

            return groupedByDay;
        },
        formatDay(day) {
            const dayNames = {
                "Poniedziałek": "Pon",
                "Wtorek": "Wto",
                "Środa": "Śro",
                "Czwartek": "Czw",
                "Piątek": "Pią"
            };
            return dayNames[day] || day;
        },
        openOrderModal(row = null) {
            this.showModal = true;
            this.currentRow = row;
            this.selectedItem = row.status ? row.status : "Wybierz status";
        },
        closeOrderModal() {
            this.currentRow = null;
            this.showModal = false;
            this.selectedItem = "";
        },
        openDeleteModal(orderId) {
            this.orderToDelete = orderId;
            this.showModalDelete = true;
        },
        closeDeleteModal() {
            this.orderToDelete = null;
            this.showModalDelete = false;
        },
        async loadAllOrder() {
            try {
                this.rows = await getOrders();
            } catch (e) {
                console.error("Failed to load orders:", e);
            }
        },
        async sendData(id) {
            await updateOrderStatus(id, { status: this.selectedItem });
            await this.loadAllOrder();
        },
        async confirmDeleteOrder() {
            if (this.orderToDelete) {
                try {
                    await deleteOrder(this.orderToDelete);
                    await this.loadAllOrder();
                } catch (e) {
                    console.error("Ошибка при удалении заказа:", e);
                }
                this.closeDeleteModal();
            }
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
    background-color: #d9534f;
    border: 1px solid #d9534f;
    font-weight: bold;
    color: var(--background-color);
    padding: 10px 15px;
    cursor: pointer;
}

.mini-btn:hover {
    background-color: var(--background-color);
    color: #d9534f;
}
</style>