<template>
    <section class="order-summary">
        <h2>Podsumowanie zamówienia</h2>

        <div class="summary-details">
            <h3>Twoje zamówienie</h3>
            <ul v-if="basketItems.length">
                <li v-for="item in basketItems" :key="item.title">
                    <span>{{ item.title }}</span>
                    <span>{{ item.price }} PLN</span>
                </li>
                <li class="total">
                    <span>Łącznie:</span>
                    <span>{{ totalAmount }} PLN</span>
                </li>
            </ul>
            <div v-else class="text-container">
                <p class="text">Koszyk jest pusty</p>
            </div>
        </div>

            <form id="payment-form" @submit.prevent="handlePayment">
                <button id="submit">
                    <span id="button-text">{{ isProcessing ? 'Przetwarzanie...' : 'Pay now' }}</span>
                </button>
            </form>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            elements: null,
            clientSecret: null,
            isProcessing: false,
            items: [{ id: "xl-tshirt", amount: 1000 }],
        };
    },
    computed: {
        totalAmount() {
            return this.basketItems.reduce((total, item) => total + item.price, 0);
        },
        ...mapState({
            basketItems: (state) => state.basketItems,
        }),
    },
    methods: {
        async handlePayment() {
        },
    },
};
</script>

<style scoped>
.order-summary {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.order-summary h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: var(--primary-color);
}

.summary-details {
    margin-bottom: 30px;
}

.summary-details h3 {
    font-size: 20px;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.summary-details ul {
    list-style: none;
    padding: 0;
}

.summary-details li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.summary-details li.total {
    font-weight: bold;
    font-size: 18px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
}
</style>
