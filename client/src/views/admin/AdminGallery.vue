<template>
    <div class="contact-edit">
        <h1>Редактирование Gallary</h1>
        <form @submit.prevent="updateContact">
            <div class="form-group">
                <label for="facebook">Photo</label>
                <input type="file" id="facebook" />
            </div>
            <button type="submit">Сохранить</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
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
                isOpen: false,
            },
        };
    },
    mounted() {
        this.getContactInfo();
    },
    methods: {
        async getContactInfo() {
            try {
                const response = await axios.get("/api/contacts/1"); 
                this.contact = response.data;
            } catch (error) {
                console.error("Ошибка при загрузке контактов:", error);
            }
        },
        async updateContact() {
            try {
                await axios.put(`/api/contacts/1`, this.contact); 
                alert("Контактная информация обновлена");
            } catch (error) {
                console.error("Ошибка при обновлении контактов:", error);
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

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>