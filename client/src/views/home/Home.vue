<template>
    <section class="home">
        <div class="container">
            <div class="textual-content">
                <div class="branding">
                    <div class="logo">
                        <img src="@/assets/logo.svg" alt="Company Logo">
                    </div>
                    <div class="headline">
                        <p class="text">
                            Catering <span class="color-text">Swiezy Poranek</span> oświetli Twój ranek uśmiechem i
                            dodatkową inspiracją na cały dzień
                        </p>
                        <button class="btn">
                            <router-link to="/order">Zamów</router-link>
                        </button>
                    </div>
                </div>
                <div class="features-section">
                    <div class="feature">
                        <img src="@/assets/img/home/feature-icon.jpg" alt="Feature Icon" />
                        <p>Świeże składniki</p>
                    </div>
                    <div class="feature">
                        <img src="@/assets/img/home/feature-icon.jpg" alt="Feature Icon" />
                        <p>Szybka darmowa dostawa</p>
                    </div>
                </div>
            </div>
            <div class="visual-content">
                <img src="@/assets/img/home/eat.jpg" alt="Food Image">
            </div>
        </div>
        <div class="info">
            <p>Jak działa?</p>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeSection"
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
}

.container {
    display: flex;
    justify-content: center;
    margin-top: 90px;
}

.textual-content {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.branding {
    display: flex;
    flex-direction: column;
    margin-left: var(--spacing-section);
}

.logo {
    flex: 12;
    display: flex;
    align-items: center;
}

.logo img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
}

.headline {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text {
    text-align: center;
    margin: 80px 120px 0px;
    font-size: var(--font-size-medium);
    font-weight: 500;
}

.color-text {
    padding: 3px 5px;
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
    border: 1px solid var(--primary-color);
    margin-top: 24px;
}

.btn a {
    color: var(--background-color);
}

.btn:hover {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
}

.btn:hover a {
    color: var(--primary-color);
}

.features-section {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 16px;
    margin-right: auto;
    padding-right: 32px;
    padding-left: var(--spacing-section);
    margin-top: 56px;
    box-shadow: 0 19px 40px rgba(0, 0, 0, 0.2);
}

.feature {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0px;
    border-radius: 5px;
}

.visual-content {
    display: flex;
    align-items: center;
    margin-right: 50px;
}

.visual-content img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.info {
    font-size: var(--font-size-large);
    font-weight: bold;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 32px;
    padding: 8px 16px;
    color: var(--primary-color);
    border: 3px solid var(--primary-color);
    border-radius: 24px;
}</style>
