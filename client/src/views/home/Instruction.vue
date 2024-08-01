<template>
    <section class="how-it-works">
        <div class="main-container">
            <div class="card">
                <div class="number">1</div>
                <div class="icon">
                    <img src="@/assets/img/instruction/menu-card.svg" alt="Wybierz dietę">
                </div>
                <p class="text">Wybierz dietę</p>
            </div>
            <div class="card">
                <div class="number">2</div>
                <div class="icon">
                    <img src="@/assets/img/instruction/shop-card.svg" alt="Zamawiasz zestaw">
                </div>
                <p class="text">Zamawiasz zestaw</p>
            </div>
            <div class="card">
                <div class="number">3</div>
                <div class="icon">
                    <img src="@/assets/img/instruction/car-card.svg" alt="Otrzymujesz dostawe">
                </div>
                <p class="text">Otrzymujesz dostawe</p>
            </div>
            <div class="card">
                <div class="number">4</div>
                <div class="icon">
                    <img src="@/assets/img/instruction/eat-card.svg" alt="Cieszysz się smakiem">
                </div>
                <p class="text">Cieszysz się smakiem</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "InstructionSection"
};
</script>

<style scoped>
.how-it-works {
    padding: var(--spacing-section) 0;
}

.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 76px;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 190px;
    height: 200px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.25);
    position: relative;
    padding: 10px;
}

.card .number {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: var(--font-size-medium);
    font-weight: bold;
}

.card .icon {
    margin-bottom: 10px;
}

.icon img {
    width: 100%;
    height: 100%;
}

.card .text {
    font-size: var(--font-size-medium);
    text-align: center;
    padding-inline: 20px;
}
</style>
