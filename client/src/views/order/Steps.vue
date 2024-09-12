<template>
    <section class="step-section">
        <div class="create-order">
            <div class="steps-container">
                <ul class="steps">
                    <template v-for="(step, index) in visibleSteps" :key="step">
                        <li :class="{ 'step-active': isStepActive(step) }" class="step">
                            {{ stepTitle(step) }}
                        </li>
                        <li v-if="index < visibleSteps.length - 1" class="ordinal">
                            <p class="little-arrow">❯</p>
                        </li>
                    </template>
                </ul>
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
                "/order/zestawy",
                "/order/dodatki",
                "/order/dane-dostawy",
                "/order/podsumowanie"
            ];
        },
        currentStepIndex() {
            return this.steps.indexOf(this.currentPath);
        },
        visibleSteps() {
            if (window.innerWidth <= 576) {
                const prevStepIndex = Math.max(this.currentStepIndex, 0);
                const nextStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
                return this.steps.slice(prevStepIndex, nextStepIndex + 1);
            }
            return this.steps;
        }
    },
    methods: {
        isStepActive(stepPath) {
            return this.steps.indexOf(stepPath) <= this.currentStepIndex;
        },
        stepTitle(stepPath) {
            const titles = {
                "/order/zestawy": "Wybierz zestaw",
                "/order/dodatki": "Wybierz dodatki",
                "/order/dane-dostawy": "Dane dostawy",
                "/order/podsumowanie": "Podsumowanie"
            };
            return titles[stepPath] || '';
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
}

.steps-container {
    display: flex;
    align-items: center;
    width: 100vw;
    padding-inline: var(--spacing-inline);
    justify-content: space-between;
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

.ordinal .little-arrow {
    display: contents;
}

.steps {
    display: flex;
    width: 100%;
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
    /* width: 18.5vw; */
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 24px;
    font-size: 20px;
}

.step-active {
    background-color: var(--primary-color);
    color: var(--background-color);
    font-weight: 700;
}

@media (max-width: 577px) {
    .create-order {
        padding-top: 72px;
    }

    .steps-container {
        width: 100%;
        padding-inline: var(--spacing-inline);
        gap: 4px;
    }

    .ordinal {
        width: 2%;
    }

    .ordinal p {
        margin-bottom: 24px;
    }

    .steps {
        width: 100%;
        gap: 4px;
    }

    .step-active,
    .step {
        width: 100%;
        /* width: 17vw; */
        font-size: var(--font-size-base);
    }
}


@media (min-width: 578px) and (max-width: 1024px) {
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
        font-size: var(--font-size-base);
    }
}

@media (max-width: 1024px) {

    .ordinal .little-arrow {
        display: contents;
    }

    .step-active,
    .step {
        line-height: 1;
        text-align: center;
    }
}
</style>