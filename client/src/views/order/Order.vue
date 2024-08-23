<template>
    <StepsSection />
    <section class="packet-page">
        <div class="main-section">
            <router-view />
            <div v-if="this.$route.path === '/order/podsumowanie'" class="buttons">
                <router-link v-if="this.$route.path !== '/order/zestawy'" class="mini-btn"
                    :to="isBackActive()">Wrócić</router-link>
                <router-link class="mini-btn" :to="isStepActive()">Dalej</router-link>
            </div>
        </div>
        <div v-if="this.$route.path !== '/order/podsumowanie'" class="container">
            <BasketComponent class="basket" />
            <div class="buttons">
                <router-link v-if="this.$route.path !== '/order/zestawy'" class="mini-btn"
                    :to="isBackActive()">Wrócić</router-link>
                <router-link class="mini-btn" :to="isStepActive()">Dalej</router-link>
            </div>
        </div>
    </section>
</template>

<script>
import StepsSection from "./Steps.vue";
import BasketComponent from '@/components/order/Basket.vue';

export default {
    name: "OrderPage",
    components: {
        StepsSection,
        BasketComponent
    },
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
        isStepActive() {
            return this.steps[this.steps.indexOf(this.currentPath) + 1];
        },
        isBackActive() {
            return this.steps[this.steps.indexOf(this.currentPath) - 1];
        }
    }
};
</script>

<style scoped>
.packet-page {
    display: flex;
    min-height: 600px;
    padding: 16px var(--spacing-section);
    gap: 24px;
}

.main-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 936px;
}

.container {
    display: flex;
    width: 100%;
    gap: 16px;
    flex-direction: column;
}

.buttons{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.mini-btn {
    background-color: var(--primary-color);
    border-radius: 24px;
    color: var(--background-color);
    font-weight: bold;
}

.mini-btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}
</style>
