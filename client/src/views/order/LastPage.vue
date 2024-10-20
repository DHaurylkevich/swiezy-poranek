<template>
    <div class="payment-success-page">
        <section class="success-message">
            <h1>Dziękujemy za Twoje zamówienie!</h1>
            <p class="subtext">Twoje zamówienie zostało pomyślnie złożone. Przetwarzamy je i wkrótce skontaktujemy się z Tobą!</p>
        </section>

        <section class="contact-info">
            <p>W razie jakichkolwiek pytań prosimy o kontakt:</p>
            <a href="tel:+48-123-456-789" class="phone-number">{{ contact.phone }}</a>
            <a class="facebook-link" :href="contact.facebook">Facebook</a>
        </section>

        <section class="actions">
            <router-link to="/" class="button primary">Wróć na stronę główną</router-link>
        </section>
    </div>
</template>

<script>
import { getContactInfo } from "@/services/contactsServices";

export default {
    data() {
        return {
            contact: "",
            orderDate: new Date().toLocaleDateString(),
            totalPrice: '249.00',
            orderItems: [
                { title: 'Zestaw klasyczny', count: 1, price: '49.50' },
                { title: 'Zestaw XL', count: 2, price: '99.00' },
                { title: 'Zestaw konfigurowalny', count: 1, price: '90.50' }
            ]
        };
    },
    async created() {
        await this.loadContactForm();
    },
    methods: {
        async loadContactForm() {
            try {
                this.contact = await getContactInfo();
            } catch (e) {
                console.error("Failed to load packages:", e);
            }
        },
    }
};
</script>

<style scoped>
.payment-success-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
    max-width: 100%;
    height: 100%;
    margin: 0 var(--spacing-inline);
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

.success-message {
    margin-bottom: 30px;
}

.icon-checkmark {
    font-size: 4em;
    color: var(--primary-color);
    margin-bottom: 20px;
    animation: fadeIn 0.5s ease-in-out;
}

.success-message h1 {
    font-size: 2.2em;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.success-message .subtext {
    font-size: 1.2em;
    color: #555;
}


.contact-info {
    margin-top: 30px;
}

.contact-info h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
}

.phone-number {
    display: inline-block;
    margin-top: 10px;
    margin-right: 16px;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--primary-color);
}
.facebook-link{
    display: inline-block;
    margin-top: 10px;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--primary-color);
}

.actions {
    margin-top: 40px;
}

.button {
    background-color: var(--primary-color);
    color: var(--background-color);
    padding: 12px 25px;
    text-decoration: none;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    font-size: 1.2em;
    font-weight: bold;
    transition: background-color 0.3s;
}

.button.primary:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
}

@media (max-width: 577px) {
    .payment-success-page {
        padding-top: 60px;
    }

    .success-message h1 {
        font-size: 1.8em;
    }

    .button {
        padding: 10px 20px;
        font-size: 1em;
    }
}

@media (min-width: 578px) and (max-width: 1024px) {
    .payment-success-page {
        padding-top: 70px;
    }

    .button {
        padding: 11px 22px;
    }
}
</style>
