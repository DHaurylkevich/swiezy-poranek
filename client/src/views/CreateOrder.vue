<template>
    <div class="create-order">
        <h1>Create Order</h1>
        <form @submit.prevent="createOrder">
            <div>
                <label for="clientName">Client Name</label>
                <input v-model="clientName" id="clientName" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="email" id="email" required />
            </div>
            <div>
                <label for="phone">Phone</label>
                <input v-model="phone" id="phone" required />
            </div>
            <div>
                <label for="address">Address</label>
                <input v-model="address" id="address" required />
            </div>
            <div>
                <label for="items">Items</label>
                <input v-model="items" id="items" required />
            </div>
            <div>
                <label for="totalPrice">Total Price</label>
                <input v-model="totalPrice" id="totalPrice" required />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
</template>
  
<script>
import { createOrder } from "../services/orderServices";

export default {
    name: 'CreateOrder',
    data() {
        return {
            clientName: '',
            email: '',
            phone: '',
            address: '',
            items: '',
            totalPrice: ''
        };
    },
    methods: {
        async createOrder() {
            const orderData = {
                clientName: this.clientName,
                email: this.email,
                phone: this.phone,
                address: this.address,
                items: this.items,
                totalPrice: this.totalPrice
            };
            await createOrder(orderData);
            this.$router.push('/orders');
        }
    }
};
</script>