<template>
    <section class="step-section">
        <div class="create-order">
            <div class="steps-container">
                <div class="ordinal">
                    <p>1</p>
                    <img class="circle" src="@/assets/icons/circle.svg" alt="Step 1" />
                </div>
                <ul class="steps">
                    <li :class="{ 'step-active': isStepActive('/order/zestawy') }" class="step">
                        Wybierz zestaw
                    </li>
                    <li class="ordinal">
                        <p>2</p>
                        <p class="little-arrow">❯</p>
                    </li>
                    <li :class="{ 'step-active': isStepActive('/order/dodatki') }" class="step">
                        Wybierz dodatki
                    </li>
                    <li class="ordinal">
                        <p>3</p>
                        <p class="little-arrow">❯</p>
                    </li>
                    <li :class="{ 'step-active': isStepActive('/order/dane-dostawy') }" class="step">
                        Dane dostawy
                    </li>
                    <li class="ordinal">
                        <p>4</p>
                        <p class="little-arrow">❯</p>
                    </li>
                    <li :class="{ 'step-active': isStepActive('/order/podsumowanie') }" class="step">
                        Twoje dane
                    </li>
                </ul>
                <img class="circle" src="@/assets/icons/circle.svg" alt="Final Step" />
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
        },
        currentStepIndex() {
            return this.steps.indexOf(this.currentPath);
        }
    },
    methods: {
        isStepActive(stepPath) {
            return this.steps.indexOf(stepPath) <= this.currentStepIndex;
        }
    }

};
</script>


<style scoped>
.create-order {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    /* padding-inline: var(--spacing-inline); */
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
    font-size: var(--font-size-base);
    font-weight: 700;
}

.ordinal p {
    position: absolute;
    margin-bottom: 30px;
}

.ordinal .circle {
    width: 100%;
    object-fit: fill;
}

.ordinal .arrow {
    /* display: none; */
    width: 100%;
    object-fit: contain;
}

.ordinal .little-arrow {
    display: contents;
}

.steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.step-active,
.step {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 18.5vw;
    border: 1px solid var(--primary-color);
    border-radius: 24px;
    font-size: 20px;
}

.step-active {
    background-color: var(--primary-color);
    color: var(--background-color);
    font-weight: 700;
}

@media (max-width: 576px) {
    .create-order {
        padding-top: 72px;
    }

    .steps-container {
        gap: 4px;
    }

    .ordinal {
        width: 2%;
    }

    .ordinal p {
        margin-bottom: 24px;
    }

    .steps {
        gap: 4px;
    }

    .step-active,
    .step {
        /* width: 17vw; */
        font-size: var(--font-size-base);
    }
}


@media (min-width: 577px) and (max-width: 1024px) {
    .create-order {
        padding-top: 88px;
    }

    .steps-container {
        gap: 1vw;
    }

    .steps {
        gap: 1vw;
    }

    .step-active,
    .step {
        width: 20vw;
        font-size: var(--font-size-medium);
    }
}

@media (max-width: 1024px) {

    .ordinal .arrow {
        display: none;
    }

    .ordinal .little-arrow {
        display: contents;
    }

    .step-active,
    .step {
        line-height: 1;
        text-align: center;
    }
}

@media (min-width: 1025px) {}
</style>