<template>
    <footer class="footer">
        <div class="container contacts">
            <p class="title">Контакты</p>
            <div class="text">
                <div class="icons">
                    <img src="@/assets/icons/facebook.svg" alt="Facebook" />
                    <img src="@/assets/icons/instagram.svg" alt="Instagram" />
                </div>
                <div class="icons">
                    <p>+48 000-000-000</p>
                    <p>gmaiiiil@gmail.com</p>
                </div>
            </div>
        </div>
        <div class="container info">
            <p class="title">Открыто</p>
            <div>
                <p class="adres">ул. Улица</p>
                <p class="time">Пн - Пт 10:10 - 19:00</p>
            </div>
        </div>
        <div class="container legal">
            <div class="logo">
                <img src="@/assets/logo.svg" alt="Logo" />
            </div>
            <p class="info">© 2024 Swiezy Poranek</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent"
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
    gap: 4px;
}

.contacts .icons {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
