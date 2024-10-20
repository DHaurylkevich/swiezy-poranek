<!-- src/views/ContactEdit.vue -->
<template>
    <div class="contact-edit">
        <h1>Contacts</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="facebook">Facebook</label>
                <input type="text" v-model="contact.facebook" id="facebook" />
            </div>

            <div class="form-group">
                <label for="instagram">Instagram</label>
                <input type="text" v-model="contact.instagram" id="instagram" />
            </div>

            <div class="form-group">
                <label for="phone">Telefon</label>
                <input type="text" v-model="contact.phone" id="phone" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="contact.email" id="email" />
            </div>

            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" v-model="contact.address" id="address" />
            </div>

            <div class="form-group">
                <label for="openingHours">Godziny pracy</label>
                <input type="text" v-model="contact.openingHours" id="openingHours" />
            </div>

            <button class="mini-btn" type="submit">Zapisać</button>
        </form>
    </div>
</template>

<script>
import { getContactInfo, updateContact } from "../../services/contactsServices";

export default {
    data() {
        return {
            contact: {
                facebook: "",
                instagram: "",
                phone: "",
                email: "",
                address: "",
                openingHours: "",
            },
        };
    },
    async created() {
        await this.loadContactForm()
    },
    methods: {
        async loadContactForm() {
            try {
                this.contact = await getContactInfo();
                console.log("Contact", this.contact);
            } catch (e) {
                console.error("Failed to load packages:", e);
            }
        },
        async handleSubmit() {
            try {
                await updateContact(this.contact);
                await this.loadContactForm();
                alert("Gotowe!");
            } catch (e) {
                console.error("Ошибка при сохранении пакета:", e);
            }
        },
    },
};
</script>

<style scoped>
.contact-edit {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.mini-btn:hover {
    cursor: pointer;
    background-color: var(--background-color);
    color: var(--primary-color);
    transition: background-color 0.2s ease;
}

.mini-btn {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: var(--background-color);
    font-weight: bold;
}
</style>