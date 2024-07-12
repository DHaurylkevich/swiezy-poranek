<template>
    <div class="orders">
        <h1>Orders</h1>
        <ul>
            <li v-for="order in orders" :key="order._id">
                {{ order.clientName }} - {{ order.totalPrice }}
                <button @click="deleteOrder(order._id)">Delete</button>
                <router-link :to="{ name: 'UpdateOrder', params: { id: order._id } }">Update</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { getOrders, deleteOrder } from '../services/orderServices';

export default {
    name: 'OrdersPage',
    data() {
        return {
            orders: []
        };
    },
    async created() {
        this.orders = await getOrders();
    },
    methods: {
        async deleteOrder(id) {
            await deleteOrder(id);
            this.orders = await getOrders();
        }
    }
};
</script>