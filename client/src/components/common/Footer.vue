<template>
    <footer class="footer">
        <div class="container contacts">
            <p class="title">Kontakty</p>
            <div class="text">
                <div class="contact">
                    <p>{{ contact.phone }}</p>
                    <p>{{ contact.email }}</p>
                </div>
                <div class="icons">
                    <a :href="contact.facebook"><img src="@/assets/icons/facebook.svg" alt="Facebook" /></a>
                </div>
            </div>
        </div>
        <div class="container">
            <p class="title">Otwarto</p>
            <div>
                <p class="address">{{ contact.address }}</p>
                <p class="time">{{ contact.openingHours }}</p>
            </div>
        </div>
        <div class="container legal">
            <div class="logo">
                <img src="@/assets/logo.svg" alt="Logo Świeży Poranek Catering w Poznaniu" />
            </div>
            <p class="info">©2024 Swiezy Poranek</p>
            <small>Icons made by <a href="https://www.flaticon.com/ru/free-icons/"
                    title="салат иконки">Eucalyp- Flaticon</a></small>
        </div>
    </footer>
</template>

<script>
import { getContactInfo } from "@/services/contactsServices";

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
    justify-content: space-between;
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

.icon-license {
    font-size: 10px;
}

@media (max-width: 576px) {
    .footer {
        padding: 32px var(--spacing-inline);
        gap: 8px;
    }

    .container {
        gap: 0px;
        justify-content: unset;
    }

    .title {
        font-size: var(--font-size-base);
        margin-bottom: 7px;
    }

    .contacts .text {
        gap: 8px;
    }

    .address,
    .time,
    .contact,
    .legal .info {
        font-size: 10px;
    }

    .legal .logo {
        display: none;
    }

    .icons img {
        width: 16px;
        height: 16px;
        object-fit: contain;
    }

}
</style>
