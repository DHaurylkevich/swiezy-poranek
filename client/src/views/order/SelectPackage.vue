<template>
    <section class="order-section select-package">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection class="package" sectionTitle="Zestawy" :packages="packages" :selected="selectedPackage"
                filterType="zestawy" @addToBasket="selectPackage" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <MenuSection v-if="selectedPackage" @addToBasket="selectedDish" :menus="selectedPackage"
                :selectedDishes="selectedDishes" />
        </transition>
        <PackageSection v-if="selectedPackage" class="package" sectionTitle="Rodzaj zestawów" :packages="TypePackages"
            :selected="selectedType" @addToBasket="selectType" />
        <!-- <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection v-if="selectedType" class="package-period" sectionTitle="Wybierz okres" :packages="periods"
                :selected="selectedPeriod" @addToBasket="selectPeriod" />
        </transition> -->
    </section>
</template>

<script>
import PackageSection from "@/components/order/PackageSection.vue";
import MenuSection from "@/components/order/MenuSection.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
    components: {
        PackageSection,
        MenuSection
    },
    data() {
        return {
            TypePackages: [
                { title: "Standard" },
                { title: "Vegetarian" }
            ],
            // periods: [
            //     { title: "1 tydzień / 5 dni" },
            // ],
            selectedPackage: null,
            selectedDishes: [],
            selectedMenu: null,
            selectedType: null,
            // selectedPeriod: null,
            totalIndex: ""
        };
    },
    computed: {
        ...mapGetters(["packages"]),
    },
    methods: {
        ...mapMutations(["addToBasket", "removeFromBasket"]),
        selectPackage(packageItem) {
            this.selectedPackage = packageItem;
            this.resetSelectionExceptPackage();
        },
        selectedDish(menuItem, mealtime = false) {
            if (!mealtime) {
                console.log("s", menuItem)
                const dishIndex = this.selectedDishes.findIndex(selectedDish => selectedDish === menuItem);
                if (dishIndex === -1) {
                    this.selectedDishes.push(menuItem);
                    console.log("ses", this.selectedDishes)
                } else {
                    this.selectedDishes.splice(dishIndex, 1);
                }
            } else {
                const mealtimeIndex = this.selectedDishes.findIndex(selectedDish => selectedDish.type === menuItem.type && selectedDish.day === menuItem.day);
                if (mealtimeIndex === -1) {
                    this.selectedDishes.push(menuItem);
                } else {
                    this.selectedDishes.splice(mealtimeIndex, 1);
                }
            }
        },
        selectType(typeItem) {
            this.selectedType = typeItem;
            // this.selectedPeriod = null;
            // ${this.selectedPeriod.index}

            this.totalIndex = `${this.selectedPackage.index}${this.selectedType.index}`;

            const fullPackage = {
                index: this.totalIndex,
                title: this.selectedPackage.title,
                price: this.selectedPackage.price,
                type: this.selectedType.title,
                // period: this.selectedPeriod.title,
                dishes: this.selectedDishes,
                count: 0
            };

            this.addToBasket(fullPackage);
            // console.log(fullPackage)
            this.resetSelection();
        },
        // selectPeriod(period) {
        //     this.selectedPeriod = period;
        //     this.totalIndex = `${this.selectedPackage.index}${this.selectedType.index}${this.selectedPeriod.index}`;

        //     const fullPackage = {
        //         index: this.totalIndex,
        //         title: this.selectedPackage.title,
        //         price: this.selectedPackage.price,
        //         type: this.selectedType.title,
        //         period: this.selectedPeriod.title,
        //         dishes: this.selectedDishes,
        //         count: 0
        //     };

        //     this.addToBasket(fullPackage);
        //     console.log(fullPackage)
        //     this.resetSelection();
        // },
        resetSelection() {
            this.selectedPackage = null;
            this.selectedDishes = [];
            this.selectedType = null;
            // this.selectedPeriod = null;
            this.totalIndex = "";
        },
        resetSelectionExceptPackage() {
            this.selectedDishes = [];
            this.selectedType = null;
            // this.selectedPeriod = null;
            this.totalIndex = "";
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = "opacity 0.3s ease";
            el.style.opacity = 1;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            done();
        },
        leave(el, done) {
            el.style.transition = "opacity 0.2s ease";
            el.style.opacity = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
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
