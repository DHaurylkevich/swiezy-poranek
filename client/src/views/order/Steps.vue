<template>
    <section class="order">
        <div class="create-order">
            <div class="steps-container">
                <div class="ordinal">
                    <p>1</p>
                    <img src="@/assets/icons/circle.svg" />
                </div>
                <ul class="steps">
                    <li :class="{ 'step-active': isStepActive('/order/zestawy') }" class="step">
                        Wybierz zestaw
                    </li>
                    <div class="ordinal">
                        <p>2</p>
                        <img src="@/assets/icons/arrow.svg" />
                    </div>
                    <li :class="{ 'step-active': isStepActive('/order/dodatki') }" class="step">
                        Dodatki
                    </li>
                    <div class="ordinal">
                        <p>3</p>
                        <img src="@/assets/icons/arrow.svg" />
                    </div>
                    <li :class="{ 'step-active': isStepActive('/order/dane-dostawy') }" class="step">
                        Dane dostawy
                    </li>
                    <div class="ordinal">
                        <p>4</p>
                        <img src="@/assets/icons/arrow.svg" />
                    </div>
                    <li :class="{ 'step-active': isStepActive('/order/podsumowanie') }" class="step">
                        Podsumowanie
                    </li>
                </ul>
                <img src="@/assets/icons/circle.svg" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "CreateOrder",
    computed: {
        currentPath() {
            return this.$route.path;
        },
        steps() {
            return [
                '/order/zestawy',
                '/order/dodatki',
                '/order/dane-dostawy',
                '/order/podsumowanie'
            ];
        }
    },
    methods: {
        isStepActive(stepPath) {
            return this.steps.indexOf(stepPath) <= this.steps.indexOf(this.currentPath);
        }
    }
};
</script>

<style scoped>
.create-order {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 90px;
}

.steps-container {
    display: flex;
    align-items: center;
    gap: 8px
}

.ordinal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 16px;
    font-weight: bold;
}

.ordinal p {
    position: absolute;
    bottom: 10px;
}

.steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.step {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 228px;
    border: 1px solid var(--primary-color);
    border-radius: 24px;
    font-size: 20px;
}

.step-active {
    display: flex;
    background-color: var(--primary-color);
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 228px;
    border-radius: 24px;
    font-size: 20px;
    font-weight: bold;
}
</style>