<template>
    <section class="order-section delivery-form">
        <h2>Dane dostawy</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="fullName">Imię i nazwisko</label>
                <input type="text" id="fullName" v-model="formData.fullName" required placeholder="Imię i nazwisko" />
            </div>
            <div class="form-group">
                <label for="phone">Telefon</label>
                <input type="tel" id="phone" v-model="formData.phone" required placeholder="Telefon"
                    pattern="^\+?[0-9]{9,13}$" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" placeholder="Email (opcjonalnie)" />
            </div>
            <div class="form-group">
                <label for="address">Adres</label>
                <input type="text" id="address" v-model="formData.address" required placeholder="Adres" />
            </div>
            <div class="form-group">
                <label for="comment">Komentarz</label>
                <textarea id="comment" v-model="formData.comment"
                    placeholder="Komentarz dotyczący dostawy (opcjonalnie)"></textarea>
            </div>

            <button v-if="showSaveButton" type="submit" class="submit-button">Zapisz</button>
        </form>
    </section>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
    data() {
        return {
            formData: {
                fullName: '',
                phone: '',
                email: '',
                address: '',
                deliveryDate: '',
                comment: ''
            }
        };
    },
    computed: {
        ...mapGetters(["orderData"]),
        showSaveButton() {
            console.log(this.orderData);
            return this.orderData ?
                Object.keys(this.formData).some(key =>
                    this.formData[key] !== this.orderData[key]
                ) :
                false;
        }
    },
    mounted() {
        if (this.orderData) {
            this.formData = { ...this.orderData };
        };
    },
    methods: {
        ...mapMutations(["setOrderData"]),
        submitForm() {
            this.setOrderData(this.formData);
        }
    }
};
</script>

<style scoped>
.delivery-form {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.delivery-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--font-size-large);
    /* font-size: 24px; */
    /* color: var(--primary-color); */
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-size: var(--font-size-medium);
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
    font-weight: bold;
    background-color: var(--primary-color);
    color: var(--background-color);
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: var(--background-color);
    color: var(--primary-color);

}
</style>
