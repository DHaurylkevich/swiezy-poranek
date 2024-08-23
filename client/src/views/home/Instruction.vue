<template>
    <section class="how-it-works">
        <div class="main-container">
            <div class="card" v-for="(step, index) in steps" :key="index">
                <div class="number">{{ index + 1 }}</div>
                <div class="icon">
                    <img :src="step.icon" :alt="step.alt">
                </div>
                <p class="text">{{ step.text }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "InstructionSection",
    data() {
        return {
            steps: [
                { icon: require("@/assets/img/instruction/menu-card.svg"), alt: "Wybierz dietę", text: "Wybierz dietę" },
                { icon: require("@/assets/img/instruction/shop-card.svg"), alt: "Zamawiasz zestaw", text: "Zamawiasz zestaw" },
                { icon: require("@/assets/img/instruction/car-card.svg"), alt: "Otrzymujesz dostawe", text: "Otrzymujesz dostawe" },
                { icon: require("@/assets/img/instruction/eat-card.svg"), alt: "Cieszysz się smakiem", text: "Cieszysz się smakiem" }
            ]
        };
    }
};
</script>

<style scoped>
.how-it-works {
    padding: var(--spacing-inline) 0;
}

.main-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 56px;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 224px;
    height: 232px;
    background-color: var(--background-color);
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    /* padding: 16px; */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.card .number {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 30px;
    font-weight: bold;
    color: var(--primary-color);
}

.card .icon {
    margin-bottom: 16px;
    width: auto;
    height: auto;
}

.icon img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.card .text {
    font-size: var(--font-size-large);
    font-weight: 600;
    text-align: center;
    padding-inline: 40px;
}

@media (max-width: 576px) {
    .main-container {
        gap: 32px;
        padding: 50px 0;
    }

    .card {
        width: 206px;
        height: 216px;
    }
    .card .icon {
        margin-bottom: 8px;
    }

    .card .text {
        padding-inline: 24px;
        line-height: 1.2;
    }
}

@media (min-width: 577px) and (max-width: 768px) {}

@media (min-width: 769px) and (max-width: 1024px) {}

@media (min-width: 1025px) {}
</style>
