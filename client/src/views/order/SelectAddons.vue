<template>
    <section class="order-section select-addons">
        <PackageSection class="package" sectionTitle="Dodatki" :packages="packages" filterType="dodatki"
            :selected="selectedAddons" @addToBasket="selectAddons" />
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <MenuSection v-if="selectedAddons" @addToBasket="selectedDish" :menus="selectedAddons"
                :selectedDishes="selectedDishes" />
        </transition>
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="selectedDishes.length" class="btn">
                <button class="btn" @click="acceptMenu">Do koszyka</button>
            </div>
        </transition>
    </section>
</template>

<script>
import PackageSection from '@/components/order/PackageSection.vue';
import MenuSection from "@/components/order/MenuSection.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
    components: {
        PackageSection,
        MenuSection
    },
    data() {
        return {
            selectedAddons: null,
            selectedDishes: [],
            totalIndex: ""
        }
    },
    computed: {
        ...mapGetters(["packages"]),
    },
    methods: {
        ...mapMutations(['addToBasket']),
        selectAddons(addon) {
            this.resetSelection();
            this.selectedAddons = addon;
        },
        selectedDish(menuItem) {
            const dishIndex = this.selectedDishes.findIndex(selectedDish => selectedDish.index === menuItem.index);
            if (dishIndex === -1) {
                this.selectedDishes.push(menuItem);
            } else {
                this.selectedDishes.splice(dishIndex, 1);
            }
        },
        acceptMenu() {
            const dishesIndexes = this.selectedDishes.map(dish => dish.index).join('');
            this.totalIndex = `${this.selectedAddons.index}${dishesIndexes}`;


            const fullPackage = {
                index: this.totalIndex,
                title: this.selectedAddons.title,
                price: this.selectedAddons.price,
                dishes: this.selectedDishes,
                count: 0
            };
            this.addToBasket(fullPackage);
            this.resetSelection();
        },
        resetSelection() {
            this.selectedAddons = null;
            this.selectedDishes = [];
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
}
</script>

<style scoped>
/* @media(min-width: 578px) and (max-width: 768px){
    .select-addons {
        width: 60%;
    }
}
@media(min-width: 769px){
    .select-addons {
        width: 70%;
    }
} */
</style>