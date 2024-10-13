<template>
    <footer class="footer">
        <div class="container contacts">
            <p class="title">Kontakty</p>
            <div class="text">
                <div class="icons">
                    <p>{{ contact.phone }}</p>
                    <p>{{ contact.email }}</p>
                </div>
                <div class="icons">
                    <a :href="contact.facebook"><img src="@/assets/icons/facebook.svg" alt="Facebook" /></a>
                </div>
            </div>
        </div>
        <div class="container info">
            <p class="title">Otwarto</p>
            <div>
                <p class="adres">{{contact.address}}</p>
                <p class="time">{{ contact.openingHours }}</p>
            </div>
        </div>
        <div class="container legal">
            <div class="logo">
                <img src="@/assets/logo.svg" alt="Logo" />
            </div> 
            <p class="info"> Catering Poznań</p>
            <p class="info">©2024 Swiezy Poranek</p>
        </div>
    </footer>
</template>

<script>
import { getContactInfo } from "@/services/contactsServices"

export default {
    name: "FooterComponent",
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
            } catch (e) {
                console.error("Failed to load packages:", e);
            }
        },
    }
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-evenly;
    padding: 56px var(--spacing-inline);
    gap: 50px;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.title {
    margin-bottom: 12px;
    font-size: var(--font-size-medium);
    font-weight: 500;
}

.legal .logo {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    width: 100px;
}

.logo img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
}

.legal .info {
    font-size: var(--font-size-base);
}

.contacts .text {
    display: flex;
    gap: 16px;
}

.contacts .icons {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.icons img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

@media (max-width: 576px) {
    .footer {
        flex-wrap: wrap;
        padding: 32px var(--spacing-inline);
    }

    .container {
        justify-content: space-between;
    }

    .legal .logo {
        display: none;
    }

}

/* Стиль для планшетов */
@media (min-width: 577px) and (max-width: 768px) {}

/* Стиль для десктопов */
@media (min-width: 769px) and (max-width: 1024px) {}

@media (min-width: 1025px) {}
</style>
