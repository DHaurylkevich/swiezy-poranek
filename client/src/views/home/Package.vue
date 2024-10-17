<template>
    <section class="food-set">
        <header class="section-title">
            <!-- <div class="icon">
                <img src="@/assets/img/foodset/sun.svg" alt="Sun Icon">
            </div> -->
            <h2 class="text">Zestawy</h2>
        </header>
        <div v-if="packages.length >= 4" class="carousel-container">
            <Carousel :items="packages" type="carousel" />
        </div>
        <div v-else class="cards-container">
            <Card v-for="(pkg, index) in packages" :key="index" :title="pkg.title" :image="pkg.url" :price="pkg.price"
                :description="pkg.description" />
        </div>
    </section>
</template>

<script>
import Card from "@/components/ui/CardComponent.vue";
import Carousel from "@/components/ui/Carousel.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "FoodSetSection",
    components: {
        Card,
        Carousel,
    },
    computed: {
        ...mapGetters(["packages"]),
    },
    mounted() {
        if (!this.packages.length) {
            this.loadPackages();
        }
    },
    methods: {
        ...mapActions(["loadPackages"]),
    },
}
</script>

<style scoped>
.food-set {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-section);
    background-color: var(--background-color);
    padding-top: 50px;
    padding-bottom: 50px;
}

.section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8px;
}

.section-title .icon {
    display: flex;
    align-items: center;
}

.icon img {
    max-width: 100%;
    /* width: 4.5vw; */
    height: auto;
}

.section-title .text {
    font-size: var(--font-size-large);
    font-weight: bold;
}

.carousel-container {
    position: relative;
    padding-inline: var(--spacing-inline);
    width: 100%;
}

@media (max-width: 576px) {
    .food-set {
        padding-bottom: 80px;
    }

    .section-title {
        padding-bottom: 8px;
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .section-title {
        padding-bottom: 8px;
    }
}
</style>