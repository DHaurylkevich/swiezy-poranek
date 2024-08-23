<template>
    <section class="delivery-form">
        <h2>Данные для доставки</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="fullName">ФИО</label>
                <input type="text" id="fullName" v-model="deliveryData.fullName" required
                    placeholder="Введите ваше полное имя" />
            </div>
            <div class="form-group">
                <label for="phone">Телефон</label>
                <input type="tel" id="phone" v-model="deliveryData.phone" required placeholder="+7 (___) ___-__-__"
                    pattern="^\+?\d{0,13}" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="deliveryData.email" required placeholder="Введите ваш email" />
            </div>
            <div class="form-group">
                <label for="address">Адрес</label>
                <input type="text" id="address" v-model="deliveryData.address" required placeholder="Введите ваш адрес" />
            </div>
            <div class="form-group">
                <label for="deliveryDate">Дата доставки</label>
                <input type="date" id="deliveryDate" v-model="deliveryData.deliveryDate" required />
            </div>
            <div class="form-group">
                <label for="comment">Комментарий</label>
                <textarea id="comment" v-model="deliveryData.comment"
                    placeholder="Ваш комментарий по доставке (необязательно)"></textarea>
            </div>
            <button type="submit" class="submit-button">Оформить заказ</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            deliveryData: {
                fullName: '',
                phone: '',
                email: '',
                address: '',
                deliveryDate: '',
                comment: ''
            }
        };
    },
    methods: {
        submitForm() {
            console.log('Данные для доставки:', this.deliveryData);
            // Здесь можно добавить логику отправки данных на сервер или выполнения других действий.
        }
    }
};
</script>

<style scoped>
.delivery-form {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.delivery-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: var(--primary-color);
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

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--primary-color);
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
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
