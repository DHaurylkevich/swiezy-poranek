<template>
    <div class="carousel" ref="carousel">
        <div v-if="type === 'gallery'" class="carousel-inner">
            <ul class="carousel-items">
                <li v-for="(item, index) in items" :key="index" class="image" ref="card">
                    <img :src="item.url" :alt="item.title" loading="lazy"/>
                </li>
            </ul>
        </div>
        <div v-else class="carousel-inner">
            <ul class="carousel-items">
                <li v-for="(item, index) in items" :key="index" class="card" ref="card">
                    <Card :key="index" :title="item.title" :image="item.image" :price="item.price"
                        :description="item.description"/>
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
import Card from "@/components/ui/CardComponent.vue"

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
        scroll(direction) {
            const carousel = this.$refs.carousel;
            const card = this.$refs.card;

            console.log('Ширина карточки без border:', card[0].offsetWidth);


            const scrollAmount = card[0].offsetWidth;

            if (direction === 'prev') {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'next') {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        },
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

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
}

.carousel-items {
    display: inline-flex;
    align-items: center;
    gap: 24px;
    width: 100%;
    list-style: none;
}

.carousel-items .card {
    min-width: 284px;
    height: auto;
}

.carousel-items .image {
    min-width: 30%;
    height: auto;
}


.container-btn {
    position: absolute;
    z-index: 2;
    display: flex;
    gap: 8px;
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

    .carousel-items .card {
        min-width: 208px;
    }

    .carousel-items .image {
        min-width: 232px;
    }
}

@media (min-width: 426px) and (max-width: 576px) {
    .carousel-items {
        gap: 24px;
    }

    .carousel-items .card {
        min-width: 232px;
    }

    .carousel-items .image {
        min-width: 284px;
    }
}

/*

@media (min-width: 577px) and (max-width: 768px) {}
*/
@media (min-width: 769px) and (max-width: 1024px) {
    .carousel-items .card {
        min-width: 284px;
    }

    .carousel-items .image {
        min-width: 45%;
        height: auto;
    }
}
</style>
