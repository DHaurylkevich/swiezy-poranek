<template>
    <section class="order-section select-package">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection class="package" sectionTitle="Zestawy" :packages="packages" :selected="selectedPackage"
                filterType="zestawy" @addToBasket="selectPackage" />
        </transition>
        <!-- <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <PackageSection v-if="selectedPackage" class="package" sectionTitle="Rodzaj zestawów" :packages="TypePackages"
                :selected="selectedType" @addToBasket="selectType" />
        </transition> -->
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <MenuSection v-if="selectedPackage" @addToBasket="selectedDish" :menus="selectedPackage"
                :selectedDishes="selectedDishes" />
        </transition>
        <div v-if="selectedDishes.length">
            <button class="btn" @click="acceptMenu">Do koszyka</button>
        </div>
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
            selectedPackage: null,
            selectedDishes: [],
            selectedMenu: null,
            selectedType: null,
            totalIndex: ""
        };
    },
    computed: {
        ...mapGetters(["packages"]),
    },
    methods: {
        ...mapMutations(["addToBasket"]),
        selectPackage(packageItem) {
            this.resetSelection();
            this.selectedPackage = packageItem;
        },
        selectedDish(menuItem) {
            let dishIndex = this.selectedDishes.findIndex(selectedDish => selectedDish.index.slice(0, -1) === menuItem.index.slice(0, -1));
            if (dishIndex === -1) {
                this.selectedDishes.push(menuItem);
            } else {
                dishIndex = this.selectedDishes.findIndex(selectedDish => selectedDish.index === menuItem.index);
                if (dishIndex === -1) {
                    this.selectedDishes.splice(dishIndex, 1);
                    this.selectedDishes.push(menuItem);
                } else {
                    this.selectedDishes.splice(dishIndex, 1);
                }
            }
        },
        // selectType(typeItem) {
        //     this.selectedType = typeItem;
        //     const dishesIndexes = this.selectedDishes.map(dish => dish.index).join('');
        //     if (dishesIndexes === -1) {
        //         this.selectedDishes.push(menuItem);
        //     } else {
        //         this.selectedDishes.splice(dishesIndexes, 1);
        //     }
        // },
        acceptMenu() {
            const dishesIndexes = this.selectedDishes.map(dish => dish.index).join('');

            this.totalIndex = `${this.selectedPackage.index}${dishesIndexes}`;

            const fullPackage = {
                index: this.totalIndex,
                title: this.selectedPackage.title,
                price: this.selectedPackage.price,
                dishes: this.selectedDishes,
                count: 0
            };

            this.addToBasket(fullPackage);
            this.resetSelection();
        },
        resetSelection() {
            this.selectedPackage = null;
            this.selectedDishes = [];
            // this.selectedType = null;
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
            setTimeout(done, 600);
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

.btn {
    background-color: var(--primary-color);
    border-radius: 24px;
    border: none;
    color: var(--background-color);
    font-weight: bold;
}

.btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}
</style>
