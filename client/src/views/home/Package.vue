<template>
    <section class="food-set">
        <header class="section-title">
            <div class="icon">
                <img src="@/assets/img/foodset/sun.svg" alt="Sun Icon">
            </div>
            <h2 class="text">Zestawy</h2>
        </header>
        <div v-if="packages.length > 4" class="carousel-container">
            <Carousel :items="packages" :type="'carousel'" />
        </div>
        <div v-else class="cards-container">
            <Card v-for="(pkg, index) in packages" :key="index" :title="pkg.title" :image="pkg.image" :price="pkg.price"
                :description="pkg.description" />
        </div>
    </section>
</template>

<script>
import Card from "@/components/ui/CardComponent.vue";
import Carousel from "@/components/ui/Carousel.vue";
import { getPackages } from "@/services/packageServices";


export default {
    name: "FoodSetSection",
    components: {
        Card,
        Carousel,
    },
    data() {
        return {
            packages: [
            //     { title: "Classic", image: require("@/assets/img/foodset/vege.png"), price: 45, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            //     { title: "XL", image: require("@/assets/img/foodset/vege.png"), price: 55, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            //     { title: "Obiad + Zupka", image: require("@/assets/img/foodset/vege.png"), price: 24, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            //     { title: "Śniadanie + salatka", image: require("@/assets/img/foodset/vege.png"), price: 20, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            //     { title: "3 sałatki dziennie", image: require("@/assets/img/foodset/vege.png"), price: 32, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            ]
        }
    },
    async created() {
        try {
            this.packages = await getPackages();
            console.log(this.packages)
        } catch (error) {
            console.error('Failed to load packages:', error);
        }
    }
}
</script>

<style scoped>
.food-set {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-section);
    background-color: var(--background-color);
    padding-top: 16px;
    padding-bottom: 100px;
}

.section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section-title .icon {
    display: flex;
    align-items: center;
}

.icon img {
    max-width: 100%;
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