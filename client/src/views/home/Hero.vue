<template>
    <section class="home">
        <div class="container">
            <div class="textual-content">
                <div class="headline">
                    <div class="logo">
                        <img rel="preload" class="logo-img" src="@/assets/logo.svg"
                            alt="Logo Świeży Poranek Catering w Poznaniu" />
                        <img rel="preload" class="food-img" src="@/assets/img/home/eat-half.webp"
                            alt="Logo Świeży Poranek Catering w Poznaniu" />
                    </div>
                    <p class="text">
                        Catering <span class="color-text">Świeży
                            Poranek</span> oświetli Twój ranek uśmiechem i
                        dodatkową inspiracją na cały dzień
                    </p>
                    <router-link class="btn" to="/order/zestawy">Zamów</router-link>
                </div>
                <div class="features-section">
                    <div class="feature">
                        <img src="@/assets/img/home/delivery.png" alt="Darmowa dostawa catering Poznań" />
                        <p>Szybka darmowa dostawa</p>
                    </div>
                    <div class="feature">
                        <img src="@/assets/img/home/fresh.png" alt="Świeże składniki catering" />
                        <p>Świeże składniki</p>
                    </div>
                </div>

            </div>
            <div class="visual-content">
                <img rel="preload" src="@/assets/img/home/eat.webp" alt="Świeży Poranek Catering w Poznaniu" />
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "HeroSection"
};
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
    border-radius: var(--radius-section);
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.2);
    padding-bottom: var(--spacing-inline);
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

.textual-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 100%;
    object-fit: contain;
}

.logo .food-img {
    display: none;
}

.headline {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: var(--spacing-inline);
}

.text {
    text-align: center;
    margin-top: 80px;
    padding-inline: 35px;
    font-size: var(--font-size-medium);
    font-weight: 500;
}

.color-text {
    padding: 4px 6px;
    background-image: url(@/assets/img/home/figure.svg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: var(--background-color);
    font-weight: bold;
}

.btn {
    background-color: var(--primary-color);
    color: var(--background-color);
    font-weight: bold;
    border: 1px solid var(--primary-color);
    margin-top: 24px;
}

.btn:hover {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}

.features-section {
    display: flex;
    align-items: center;
    gap: 32px;
    padding-right: 32px;
    padding-left: var(--spacing-inline);
    margin-right: auto;
    margin-top: 56px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.feature {
    display: flex;
    align-items: center;
    font-size: var(--font-size-base);
    gap: 16px;
    margin: 24px 0px;
}

.feature img {
    width: 56px;
    height: auto
}

.visual-content {
    display: flex;
    flex: 1;
    align-items: center;
    margin-right: 50px;
}

.visual-content img {
    max-width: 100%;
    width: 696px;
    height: auto;
    object-fit: cover;
}

@media (max-width: 425px) {
    .logo {
        margin-left: 0;
    }

    .logo .logo-img,
    .visual-content {
        display: none;
    }

    .logo .food-img {
        display: flex;
        max-width: 100%;
        width: 734px;
        align-items: center;
    }

    .container {
        margin-top: 80px;
    }

    .text {
        margin: 0 24px;
        line-height: 1.5;
    }

    .features-section {
        gap: 8px;
        padding-right: 0;
    }

    .feature {
        gap: 8px;
        font-size: 14px;
        margin: 24px 0;
        width: 45%;
    }

    .feature img {
        width: 40px;
        height: auto;
    }
}

@media (min-width: 426px) and (max-width: 576px) {
    .container {
        margin-top: 70px;
    }

    .logo {
        flex: auto;
        justify-content: center;
        margin-left: 0;
    }

    .logo .logo-img,
    .visual-content {
        display: none;
    }


    .logo .food-img {
        display: flex;
        max-width: 100%;
        width: 734px;
        align-items: center;
    }

    .text {
        margin: 0 29px;
        line-height: 1.5;
    }

    .features-section {
        gap: 8px;
        padding-right: 0;
    }

    .feature {
        gap: 8px;
        font-size: var(--font-size-base);
        margin: 24px 0;
        width: 45%;
    }

    .feature img {
        width: 44px;
        height: auto;
    }

    .feature p {
        line-height: 1.2;
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .container {
        margin-top: 70px;
    }

    .logo {
        flex: auto;
        justify-content: center;
        margin-left: 0;
    }

    .logo .logo-img,
    .visual-content {
        display: none;
    }

    .logo .food-img {
        display: flex;
        max-width: 100%;
        width: 734px;
        align-items: center;
    }

    .food-img img {
        width: 80%;
    }

    .text {
        margin: 0 24px;
        line-height: 1.6;
    }

    .features-section {
        gap: 24px;
        padding-right: 0;
    }

    .feature {
        gap: 16px;
        font-size: var(--font-size-base);
        margin: 24px 0;
        width: 45%;
    }

    .feature img {
        width: 56px;
        height: auto;
    }
}

@media (max-width: 768px) {
    .headline {
        padding-left: 0px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {

    .visual-content {
        margin-right: auto;
        flex: 1;
    }

    .logo {
        flex: auto;
        padding-bottom: 24px;
    }

    .text {
        margin: 0 24px;
        line-height: 1.6;
    }

    .feature {
        margin: 24px 0;
        width: 45%;
    }

    .feature img {
        width: 44px;
    }

    .feature p {
        line-height: 1.2;
    }
}
</style>
