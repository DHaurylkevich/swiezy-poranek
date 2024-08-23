<template>
    <section class="select-package">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection class="package" sectionTitle="Pakiety" :packages="packages"
                :selected="selectedPackage" @addToBasket="selectPackage" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection v-if="selectedPackage" class="package" sectionTitle="Rodzaj pakietu" :packages="TypePackages"
                :selected="selectedType" @addToBasket="selectType" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="selectedType" class="package-period">
                <h3>Wybierz okres</h3>
                <div class="period-options">
                    <button v-for="period in periods" :key="period" @click="selectPeriod(period)">
                        {{ period }}
                    </button>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>    
import PackageSection from '@/components/order/PackageSection.vue';
import { mapMutations } from "vuex";

export default {
    components: {
        PackageSection
    },
    data() {
        return {
            packages: [
                { title: "Classic", image: "../assets/img/foodset/vege.png", price: 45 },
                { title: "XL", image: "/images/standard-package.jpg", price: 55 },
                { title: "Obiad + Zupka", price: 24 },
                { title: "Śniadanie + salatka", image: "/images/special-package.jpg", price: 20 },
                { title: "3 sałatki dziennie", image: "/images/special-package.jpg", price: 32 },
                { title: "Custom", image: "/images/special-package.jpg", price: 42 }
            ],
            TypePackages: [
                { title: "Standard" },
                { title: "Vegetarian" }
            ],
            periods: ["1 tydzień", "2 tygodnie", "1 miesiąc"],
            selectedPackage: null,
            selectedType: null,
            selectedPeriod: null,
            basketItems: []
        };
    },
    methods: {
        ...mapMutations(['addToBasket']),
        selectPackage(packageItem) {
            this.selectedPackage = packageItem;
            this.selectedType = null;
            this.selectedPeriod = null;
        },
        selectType(typeItem) {
            this.selectedType = typeItem;
            this.selectedPeriod = null;
        },
        selectPeriod(period) {
            this.selectedPeriod = period;
            const fullPackage = {
                ...this.selectedPackage,
                type: this.selectedType.title,
                period: period
            };
            this.addToBasket(fullPackage);
            this.selectedPackage = null;
            this.selectedType = null;
            this.selectedPeriod = null;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.5s ease';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {

            el.style.transition = 'opacity 0.2s ease';
            el.style.opacity = 0;
            setTimeout(done, 200);
        }
    }
};
</script>

<style scoped>
.package-period {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.period-options {
    display: flex;
    gap: 24px;
}

.period-options button {
    width: 136px;
    padding: 16px;
    background-color: var(--background-color);
    border: 1px solid #efefef;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.period-options button:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
