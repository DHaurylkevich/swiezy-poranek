<template>
    <section class="order-summary">
        <h2>Podsumowanie zamówienia</h2>
        <div class="summary-details">
            <div class="basket">
                <h3>Twoje zamówienie</h3>
                <div v-if="basketItems.length" class="basket-container">
                    <details v-for="item in basketItems" :key="item.index" class="basket-item">
                        <summary class="item-header">
                            {{ item.title }} (x{{ item.count }})
                            {{ item.price }} PLN
                        </summary>
                        <div class="item-details">
                            <p v-if="item.type"><strong>Typ:</strong> {{ item.type }}</p>
                            <div class="dishes-group">
                                <ul class="dishes-list">
                                    <li v-for="(dishes, day) in groupByDay(item.dishes)" :key="day">
                                        <span class="dish-day">{{ formatDay(day) }}:</span>
                                        <ul>
                                            <li v-for="dish in dishes" :key="dish">{{ dish }}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </details>
                    <div class="total">
                        <p><strong>Łącznie:</strong> {{ totalPrice }}</p>
                    </div>
                </div>
                <div v-else class="empty-basket">
                    <p class="text">Koszyk jest pusty</p>
                </div>
            </div>

            <div class="user-details" v-if="orderData">
                <h3 class="user-title">Dane użytkownika</h3>
                <ul class="user-list">
                    <li><strong>Imię i nazwisko:</strong> <span>{{ orderData.fullName }}</span></li>
                    <li><strong>Telefon:</strong> <span>{{ orderData.phone }}</span></li>
                    <li v-if="orderData.email"><strong>Email:</strong> <span>{{ orderData.email }}</span></li>
                    <li><strong>Adres:</strong> <span>{{ orderData.address }}</span></li>
                    <li v-if="orderData.comment"><strong>Komentarz:</strong> <span>{{ orderData.comment }}</span></li>
                </ul>
                <button @click="sendInfo" class="payment-button " id="submit">
                    <span id="button-text">Zamów</span>
                </button>
            </div>
        </div>
        <div class="s-info">
            <small>Dalej twoje zamówienie zostanie przesłane do realizacji. Skontaktujemy się z
                tobą w celu uzgodnienia szczegółów płatności.</small>
        </div>
    </section>
</template>

<script>
import { createOrder } from "@/services/orderServices";
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
        ...mapGetters(["clearBasket"]),
        totalPrice() {
            const price = this.basketItems.reduce((sum, item) => {
                const uniqueDays = new Set(item.dishes.map(dish => dish.day));
                const dayCount = uniqueDays.size;

                return sum + (item.price * dayCount * item.count);
            }, 0);
            return new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
            }).format(price);
        },
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
        async sendInfo() {
            try {
                this.orderData.fullPrice = this.totalPrice
                const sendData = {
                    orderData: this.orderData,
                    basketItems: this.basketItems,
                };
                if (sendData.basketItems.length !== 0) {
                    const response = await createOrder(sendData);
                    if (response) {
                        this.clearBasket();
                        this.$router.push('/confirm');
                    } else {
                        console.log(response);
                    }
                } else {
                    alert('Koszyk jest pusty!');
                }
            } catch (error) {
                console.error("Error while sending order:", error.message);
            }
        }
    }
};
</script>


<style scoped>
.order-summary {
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    max-width: 900px;
}

.order-summary h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--font-size-large);
}

.order-summary h3 {
    margin-bottom: 16px;
    font-size: var(--font-size-medium);
    color: var(--primary-color);
}

.summary-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 48px;
}

.basket,
.user-details {
    flex: 1;
    min-width: 300px;
}

.basket-container {
    padding-left: 16px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 15px;
}

.item-header {
    cursor: pointer;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.dishes-list {
    margin-top: 10px;
    padding-left: 16px;
}

.dishes-list ul {
    padding-left: 8px;
}

.total {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
}

.empty-basket {
    text-align: center;
    padding: 20px;
    font-size: 16px;
}

.user-list {
    list-style: none;
    padding-left: 8px;
    font-size: 16px;
}

.user-list li {
    margin-bottom: 8px;
}

.payment-button {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.payment-button:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
}
.s-info{
    display: flex;
    justify-content: end;
    padding: 8px 0;
    font-size: 0.7rem;
}
</style>
