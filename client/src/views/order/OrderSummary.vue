<template>
    <section class="order-summary">
        <h2>Podsumowanie zamówienia</h2>

        <div class="summary-details">
            <div class="basket">
                <h3>Twoje zamówienie</h3>
                <!-- {{ basketItems }} -->
                <div v-if="basketItems.length" class="basket-container">
                    <div v-for="item in basketItems" :key="item.index" class="basket-item">
                        <div class="item-header">
                            <h4 class="item-title">{{ item.title }} (x{{ item.count }})</h4>
                            <p class="item-price">{{ item.price.toFixed(2) }} PLN</p>
                        </div>
                        <div class="item-details">
                            <p v-if="item.type"><strong>Typ:</strong> {{ item.type }}</p>
                            <div class="dishes-group">
                                <h5>Szczegóły:</h5>
                                <ul class="dishes-list">
                                    <li v-for="group in groupByDish(item.dishes)" :key="group.type">
                                        <span class="dish-type">{{ group.type }}:</span>
                                        <span class="dish-days">{{ formatDays(group.days) }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <p><strong>Łącznie:</strong> {{ totalAmount.toFixed(2) }} PLN</p>
                    </div>
                </div>
                <div v-else class="text-container">
                    <p class="text">Koszyk jest pusty</p>
                </div>
            </div>

            <div class="user-details" v-if="orderData">
                <h3>Dane użytkownika</h3>
                <ul>
                    <li>
                        <strong>Imię i nazwisko:</strong> <span>{{ orderData.fullName }}</span>
                    </li>
                    <li>
                        <strong>Telefon:</strong> <span>{{ orderData.phone }}</span>
                    </li>
                    <li v-if="orderData.email">
                        <strong>Email:</strong> <span>{{ orderData.email }}</span>
                    </li>
                    <li>
                        <strong>Adres:</strong> <span>{{ orderData.address }}</span>
                    </li>
                    <li v-if="orderData.comment">
                        <strong>Komentarz:</strong> <span>{{ orderData.comment }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <form id="payment-form" @submit.prevent="handlePayment">
            <button id="submit">
                <span id="button-text">Pay now</span>
            </button>
        </form>
    </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    computed: {
        totalAmount() {
            return this.basketItems.reduce((total, item) => total + item.price, 0);
        },
        ...mapGetters(["orderData"]),
        ...mapState({
            basketItems: (state) => state.basketItems,
        }),
    },
    methods: {
        handlePayment() {
            // Логика для обработки платежа
        },
        // Группировка по типам блюд и дням
        groupByDish(dishes) {
            const grouped = {};

            dishes.forEach((dish) => {
                const key = dish.type || dish.name;  // Use dish.type if available, otherwise use dish.name
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(dish.day);
            });

            return Object.keys(grouped).map((key) => ({
                type: key,
                days: grouped[key].sort(),
            }));
        },
        // Форматирование дней в компактный список
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

/* .summary-details h3 {
    font-size:var(--font-size-base);
    margin-bottom: 15px;
} */

.summary-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 30px;
}

.summary-details .basket {
    display: flex;
    flex-direction: column;
}

/* 
.basket-container {
    display: grid;
    gap: 15px;
} 
*/

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-details h3 {
    font-size: var(--font-size-medium);
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

.user-details ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin-top: 20px;
}

.user-details li {
    margin-bottom: 10px;
    font-size: 16px;
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

button:hover {
    background-color: darken(var(--primary-color), 10%);
}
</style>