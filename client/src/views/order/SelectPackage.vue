<template>
    <section class="order-section select-package">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection class="package" sectionTitle="Pakiety" :packages="packages" :selected="selectedPackage"
                @addToBasket="selectPackage" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection v-if="selectedPackage" class="package" sectionTitle="Rodzaj pakietu" :packages="TypePackages"
                :selected="selectedType" @addToBasket="selectType" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection v-if="selectedType" class="package-period" sectionTitle="Wybierz okres" :packages="periods"
                :selected="selectedPeriod" @addToBasket="selectPeriod" />
        </transition>
    </section>
</template>
<script>
import PackageSection from '@/components/order/PackageSection.vue';
import { getPackages } from "@/services/packageServices";
import { mapMutations } from "vuex";

export default {
    components: {
        PackageSection
    },
    data() {
        return {
            packages: [
                // { title: "Classic", image: require("@/assets/img/foodset/vege.png"), price: 45 },
                // { title: "XL", image: require("@/assets/img/foodset/vege.png"), price: 55 },
                // { title: "Obiad + Zupka", image: require("@/assets/img/foodset/vege.png"), price: 24 },
                // { title: "Śniadanie + salatka", image: require("@/assets/img/foodset/vege.png"), price: 20 },
                // { title: "3 sałatki dziennie", image: require("@/assets/img/foodset/vege.png"), price: 32 },
            ],
            TypePackages: [
                { title: "Standard" },
                { title: "Vegetarian" }
            ],
            periods: [
                { title: "1 tydzień" },
                { title: "2 tygodnie" },
                { title: "1 miesiąc" }
            ],
            selectedPackage: null,
            selectedType: null,
            selectedPeriod: null,
            basketItems: []
        };
    },
    async created() {
        try {
            this.packages = await getPackages();
            console.log(this.packages)
        } catch (error) {
            console.error('Failed to load packages:', error);
        }
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
                period: this.selectedPeriod.title
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
.select-package {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>