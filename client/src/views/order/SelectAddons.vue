<template>
    <section class="order-section select-addons">
        <PackageSection class="package" sectionTitle="Dodatki" :packages="packages" filterType="dodatki"
            :selected="selectedAddons" @addToBasket="selectAddons" />
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <MenuSection v-if="selectedAddons" @addToBasket="selectedDish" :menus="selectedAddons"
                :selectedDishes="selectedDishes" />
        </transition>
        <div v-if="selectedDishes.length">
            <button class="btn" @click="acceptMenu">Do koszyka</button>
        </div>
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
            done();
        },
        leave(el, done) {
            el.style.transition = "opacity 0.2s ease";
            el.style.opacity = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(done, 600);
        }
    }
}
</script>

<style scoped>
.select-addons {
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