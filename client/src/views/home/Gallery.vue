<template>
    <section class="gallery-section">
        <div class="title-section">
            <p class="title">
                Gallery
            </p>
            <p class="text">
                Pyszny widok
            </p>
        </div>
        <div class="gallery-container ">
            <Carousel :items="carouselItems"/>
        </div>
    </section>
</template>

<script>
import Carousel from '@/components/ui/Carousel.vue';
export default {
    name: "GallerySection",
    components: {
        Carousel
    },data() {
        return {
            carouselItems: [
                require("@/assets/img/gallery/img1.jpg"),
                require("@/assets/img/gallery/img2.jpg"),
            ],
        }
    }
}
</script>

<style scoped>
.gallery-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 56px;
    padding-bottom: 100px;
}

.title-section{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-section .title {
    font-size: var(--font-size-large);
    font-weight: bold;
}

.title-section .text {
    font-size: var(--font-size-medium);
}

.gallery-container  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 36px;
}

.gallery{
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
}
.scroll-column {
    width: 50vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.gallery img {
    max-width: 100%;
    height: 268px;
    width: 240px;
    gap: 15px;
    border-radius: 25px;
    object-fit: cover; 
}

@keyframes left {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-33.33%);
    }
}

</style>