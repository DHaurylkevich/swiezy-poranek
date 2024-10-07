<template>
    <StepsSection />
    <section class="packet-page">
        <div :class="{ 'last-page': isSummaryPage, 'main-section': !isSummaryPage }">
            <router-view />
            <div v-if="isSummaryPage" class="buttons">
                <router-link v-if="!isFirstStep" class="mini-btn" :to="previousStep">Wrócić</router-link>
                <button v-if="!isSummaryPage" @click="goToNextStep" class="mini-btn">Dalej</button>
            </div>
            <div v-if="!isSummaryPage" class="container">
                <BasketComponent class="basket" />
                <div class="buttons">
                    <router-link v-if="!isFirstStep" class="mini-btn" :to="previousStep">Wrócić</router-link>
                    <button v-if="!isSummaryPage" @click="goToNextStep" class="mini-btn">Dalej</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import StepsSection from "./Steps.vue";
import BasketComponent from '@/components/order/Basket.vue';
import { mapGetters } from "vuex";

export default {
    name: "OrderPage",
    components: {
        StepsSection,
        BasketComponent
    },
    computed: {
        ...mapGetters(["orderData"]),
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
        },
        isSummaryPage() {
            return this.$route.path === '/order/podsumowanie'
        },
        isFirstStep() {
            return this.$route.path === '/order/zestawy'
        },
        previousStep() {
            const currentStepIndex = this.steps.indexOf(this.currentPath) - 1;
            return this.steps[currentStepIndex] || "#";
        },
        nextStep() {
            const currentStepIndex = this.steps.indexOf(this.currentPath) + 1;
            return this.steps[currentStepIndex] || "#";
        },
        isFormPage() {
            return this.currentPath === '/order/dane-dostawy';
        }
    },
    methods: {
        isStepActive() {
            return this.steps[this.steps.indexOf(this.currentPath) + 1];
        },
        isBackActive() {
            return this.steps[this.steps.indexOf(this.currentPath) - 1];
        },
        goToNextStep() {
            console.log(this.orderData.fullName)
            if (this.isFormPage) {
                if (this.orderData.fullName) {
                    this.$router.push(this.nextStep);
                } else {
                    alert('Пожалуйста, заполните все обязательные поля!');
                }
            } else {
                this.$router.push(this.nextStep);
            }
        }
    }
};
</script>


<style scoped>
.packet-page {
    display: flex;
    min-height: 600px;
    padding: 16px var(--spacing-inline);
}

.main-section {
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: space-between;
}

.container {
    display: flex;
    gap: 16px;
    flex-direction: column;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.mini-btn {
    background-color: var(--primary-color);
    border-radius: 24px;
    border: none;
    color: var(--background-color);
    font-weight: bold;
}

.mini-btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.last-page {
    display: flex;
    gap: 24px;
    width: 100%;
    flex-direction: column;
}


@media (max-width: 576px) {
    .main-section {
        flex-direction: column;
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .container {
        width: 40%;
    }
}

@media (min-width: 769px) {
    .container {
        width: 30%;
    }
}
</style>
