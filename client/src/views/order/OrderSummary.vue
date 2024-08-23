<template>
    <section class="order-summary">
        <h2>Podsumowanie zamówienia</h2>

        <div class="summary-details">
            <h3>Twoje zamówienie</h3>
            <ul>
                <li v-for="item in basketItems" :key="item.title">
                    <span>{{ item.title }}</span>
                    <span>{{ item.price }} PLN</span>
                </li>
                <li class="total">
                    <span>Łącznie:</span>
                    <span>{{ totalAmount }} PLN</span>
                </li>
            </ul>
        </div>

        <div class="payment-section">
            <h3>Informacje płatnicze</h3>
            <form @submit.prevent="submitPayment">
                <div class="form-group">
                    <label for="cardName">Имя на карте</label>
                    <input type="text" id="cardName" v-model="paymentData.cardName" required
                        placeholder="Введите имя, как указано на карте" />
                </div>
                <div class="form-group">
                    <label for="cardNumber">Номер карты</label>
                    <input type="text" id="cardNumber" v-model="paymentData.cardNumber" required
                        placeholder="Введите номер карты" pattern="\d{16}" />
                </div>
                <div class="form-group">
                    <label for="expiryDate">Срок действия</label>
                    <input type="text" id="expiryDate" v-model="paymentData.expiryDate" required placeholder="MM/ГГ"
                        pattern="(0[1-9]|1[0-2])\/\d{2}" />
                </div>
                <div class="form-group">
                    <label for="cvc">CVC</label>
                    <input type="text" id="cvc" v-model="paymentData.cvc" required
                        placeholder="Три цифры с обратной стороны" pattern="\d{3}" />
                </div>
                <button type="submit" class="submit-button">Оплатить</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            basketItems: [
                { title: "Classic", price: 45 },
                { title: "XL", price: 55 },
                { title: "Obiad + Zupka", price: 24 }
            ],
            paymentData: {
                cardName: '',
                cardNumber: '',
                expiryDate: '',
                cvc: ''
            }
        };
    },
    computed: {
        totalAmount() {
            return this.basketItems.reduce((total, item) => total + item.price, 0);
        }
    },
    methods: {
        submitPayment() {
            console.log('Данные для оплаты:', this.paymentData);
            // Здесь можно добавить логику обработки платежа с помощью API платежной системы.
        }
    }
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

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: var(--primary-color);
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

.form-group input:focus {
    border-color: var(--primary-color);
}

.submit-button {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: var(--primary-color-dark);
}
</style>
