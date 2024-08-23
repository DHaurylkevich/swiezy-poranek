<template>
    <div class="carousel" ref="carousel">
        <div v-if="type === 'gallery'" class="carousel-inner img">
            <div class="carousel-img" v-for="(item, index) in items" :key="index">
                <img :src="item" :alt="item.alt" />
            </div>
        </div>
        <div v-else class="carousel-inner">
            <ul class="carousel-items">
                <li v-for="(item, index) in items" :key="index">
                    <Card :key="index" :title="item.title" :image="item.image" :price="item.price"
                        :description="item.description" />
                </li>

            </ul>
        </div>
    </div>
    <div class="container-btn">
        <button class="mini-btn prev" @click="scroll('prev')">❮</button>
        <button class="mini-btn next" @click="scroll('next')">❯</button>
    </div>
</template>

<script>
import Card from "@/components/ui/FoodSetCard.vue"

export default {
    name: 'CarouselComponent',
    components: {
        Card
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: "gallery",
        }
    },
    data() {
        return {
            currentIndex: 0,
            visibleItems: 4,
        };
    },
    methods: {
        updateCardsToShow() {
            const screenWidth = window.innerWidth;

            if (screenWidth < 576) {
                this.visibleItems = 0.56;
            } else if (screenWidth >= 577 && screenWidth <= 1000) {
                this.visibleItems = 0.32;
            } else {
                this.visibleItems = 4;
            }
        },
        scroll(direction) {
                const carousel = this.$refs.carousel;
                const scrollAmount = carousel.offsetWidth * this.visibleItems;

                if (direction === 'prev') {
                    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else if (direction === 'next') {
                    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
        },
    },
    mounted() {
        this.updateCardsToShow();

        window.addEventListener("resize", this.updateCardsToShow);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateCardsToShow);
    }
};
</script>

<style scoped>
.carousel {
    display: flex;
    align-items: center;
    overflow-x: scroll;
}

.carousel-inner {
    transition: transform 0.5s ease;
}

/* .carousel-inner .img {
    width: 100%;
}

.carousel-img {
    width: 100%;
    height: 100%;
}

.carousel-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
*/

.carousel-items {
    display: inline-flex;
    align-items: center;
    gap: 24px;
    width: 100%;
    list-style: none;
}

.carousel-items li {
    min-width: 208px;
    height: auto;
}


.container-btn {
    position: absolute;
    display: flex;
    bottom: -48px;
    right: var(--spacing-inline);
}

.mini-btn {
    background-color: var(--primary-color);
    border: none;
    width: auto;
    height: auto;
    font-size: var(--font-size-medium);
    padding: 8px 20px;
    z-index: 10;
}

@media (max-width: 425px) {
    .carousel-items {
        gap: 16px;
    }

    .carousel-items li {
        min-width: 208px;
    }
}

@media (min-width: 426px) and (max-width: 576px) {
    .carousel-items {
        gap: 24px;
    }

    .carousel-items li {
        min-width: 232px;
    }
}



/*

@media (min-width: 577px) and (max-width: 768px) {}
*/
@media (min-width: 769px) and (max-width: 1024px) {
    .carousel-items li {
        min-width: 284px;
    }
}
/*
@media (min-width: 1025px) {} */</style>
