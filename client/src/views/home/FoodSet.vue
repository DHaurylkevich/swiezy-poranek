<template>
    <section class="food-set">
        <header class="title-section">
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
import Card from "@/components/ui/FoodSetCard.vue"
import Carousel from "@/components/ui/Carousel.vue"

export default {
    name: "FoodSetSection",
    components: {
        Card,
        Carousel,
    },
    data() {
        return {
            packages: [
                { title: "Classic", image: require("@/assets/img/foodset/vege.png"), price: 45, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
                { title: "XL", image: require("@/assets/img/foodset/vege.png"), price: 55, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
                { title: "Obiad + Zupka", image: require("@/assets/img/foodset/vege.png"), price: 24, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
                { title: "Śniadanie + salatka", image: require("@/assets/img/foodset/vege.png"), price: 20, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
                { title: "3 sałatki dziennie", image: require("@/assets/img/foodset/vege.png"), price: 32, description: "Symphony of garlic-infused, creating a delightful masterpiece captivates senses." },
            ]
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

.title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-section .icon {
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

/* .cards-container {
    display: flex;
    margin-top: 36px;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
} */

@media (max-width: 576px) {
    .food-set {
        padding-bottom: 80px;
    }

    /* .cards-container {
        margin-top: 16px;
        justify-content: center;
    } */
    .section-title {
        padding-bottom: 8px;
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .section-title {
        padding-bottom: 8px;
    }

    .cards-container {
        /* gap: 30px; */
    }
}

/*

@media (min-width: 769px) and (max-width: 1024px) {
    .cards-container {
        gap: 40px;
    }
}

@media (min-width: 1025px) {
    .cards-container {
        gap: 50px;
    }
} */
</style>