<template>
    <div class="payment-success-page">
        <section class="success-message">
            <h1>Спасибо за ваш заказ!</h1>
            <p>Ваш заказ был успешно оформлен и скоро будет обработан.</p>
        </section>

        <section class="order-summary">
            <h2>Подтверждение заказа</h2>
            <p><strong>Номер заказа:</strong> {{ orderNumber }}</p>
            <p><strong>Дата заказа:</strong> {{ orderDate }}</p>
            <p><strong>Сумма к оплате:</strong> {{ totalPrice }} PLN</p>

            <h3>Ваш заказ:</h3>
            <ul>
                <li v-for="(item, index) in orderItems" :key="index" class="order-item">
                    <p><strong>{{ item.title }} (x{{ item.count }})</strong></p>
                    <p>Цена: {{ item.price }} PLN</p>
                </li>
            </ul>
        </section>

        <section class="contact-info">
            <h2>Что дальше?</h2>
            <p>В ближайшее время с вами свяжется наш оператор для подтверждения заказа.</p>
            <p>Если у вас есть вопросы, свяжитесь с нами по телефону: <a href="tel:+48-123-456-789">+48-123-456-789</a></p>
        </section>

        <section class="actions">
            <router-link to="/" class="button">Вернуться на главную</router-link>
            <router-link to="/orders" class="button">Посмотреть мои заказы</router-link>
        </section>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            orderNumber: '123456', // Это пример, сюда должно подставляться реальное значение
            orderDate: new Date().toLocaleDateString(),
            totalPrice: '249.00', // Тоже динамическое значение
            orderItems: [
                { title: 'Классический набор', count: 1, price: '49.50' },
                { title: 'XL Набор', count: 2, price: '99.00' },
                { title: 'Настраиваемый набор', count: 1, price: '90.50' }
            ]
        };
    }
};
</script>
  
<style scoped>
.payment-success-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.success-message h1 {
    font-size: 2em;
    margin-bottom: 10px;
    color: #4caf50;
}

.order-summary {
    margin-top: 20px;
}

.order-summary ul {
    list-style-type: none;
    padding: 0;
}

.order-summary .order-item {
    margin-bottom: 10px;
}

.contact-info {
    margin-top: 20px;
}

.actions {
    margin-top: 30px;
}

.button {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #45a049;
}
</style>
  