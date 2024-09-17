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
                <div id="payment-element"></div>
                <button id="submit" :disabled="isProcessing">
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">{{ isProcessing ? 'Przetwarzanie...' : 'Pay now' }}</span>
                </button>
            </form>
            <div id="payment-message" class="hidden"></div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import { loadStripe } from "@stripe/stripe-js";
require("dotenv").config();

const axios = require("axios");

export default {
    data() {
        return {
            stripe: null,
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
    async mounted() {
        // Загружаем Stripe
        this.stripe = await loadStripe("pk_test_51PyZBU069nJjIh9tvQvPV1s4pnrniFcmmQf4y1zq9d5cSR9YpHCvUj02k15o2xrNJoPAFTUR6Mz27RLBWp8stN7g00roSPYADU");

        // Запрашиваем clientSecret для оплаты
        const response = await axios.post(`${process.env.API_URL}/stripe/create-payment-intent`, { items: this.items });
        this.clientSecret = response.data.clientSecret;

        // Создаем элементы Stripe
        const appearance = { theme: "stripe" };
        this.elements = this.stripe.elements({ appearance, clientSecret: this.clientSecret });

        // Создаем элемент оплаты и монтируем его в форму
        const paymentElement = this.elements.create("payment");
        paymentElement.mount("#payment-element");
    },
    methods: {
        async handlePayment() {
            this.isProcessing = true;

            // Подтверждение оплаты
            const { error, paymentIntent } = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: "https://your-domain.com/order-confirmation",
                },
            });

            if (error) {
                document.querySelector("#payment-message").innerText = error.message;
                document.querySelector("#payment-message").classList.remove("hidden");
                this.isProcessing = false;
            } else if (paymentIntent.status === "succeeded") {
                alert("Оплата прошла успешно!");
                this.isProcessing = false;
            }
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

.payment-section {
    margin-top: 20px;
}

.payment-section h3 {
    font-size: 20px;
    color: var(--primary-color);
    margin-bottom: 15px;
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

button:disabled {
    background-color: grey;
}

#payment-message {
    color: red;
}

.spinner.hidden {
    display: none;
}
</style>
