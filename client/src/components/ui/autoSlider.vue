<template>
    <div class="slider" @mouseenter="pauseAutoSlide" @mouseleave="startAutoSlide">
        <div
            class="slider-wrapper"
            :style="wrapperStyle"
            @transitionend="handleTransitionEnd"
        >
            <div
                class="slide"
                v-for="(image, index) in extendedImages"
                :key="index"
            >
                <p>{{image}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                "../assets/img/gallery/img1.jpg",
                "../assets/img/gallery/img2.jpg",
                "../assets/img/gallery/img3.jpg",
            ],
            currentIndex: 0,
            isTransitioning: false,
            autoSlideInterval: null,
        };
    },
    computed: {
        // Добавляем дополнительные изображения в начало и конец для плавного перехода
        extendedImages() {
            return [this.images[this.images.length - 1], ...this.images, this.images[0]];
        },
        // Стиль обертки слайдера, чтобы управлять смещением и анимацией
        wrapperStyle() {
            return {
                transform: `translateX(-${(this.currentIndex + 1) * 100}%)`,
                transition: this.isTransitioning ? "transform 0.5s ease-in-out" : "none",
            };
        },
    },
    mounted() {
        this.startAutoSlide();
    },
    beforeUnmount() {
        this.pauseAutoSlide(); // Очищаем интервал при удалении компонента
    },
    methods: {
        // Запускаем автопрокрутку
        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => {
                this.isTransitioning = true;
                this.currentIndex += 1;
            }, 3000); // Увеличил время задержки для более комфортного просмотра
        },
        // Останавливаем автопрокрутку при наведении
        pauseAutoSlide() {
            clearInterval(this.autoSlideInterval);
        },
        // Обрабатываем завершение перехода
        handleTransitionEnd() {
            if (this.currentIndex === this.images.length) {
                this.isTransitioning = false;
                this.currentIndex = 0;
            } else if (this.currentIndex === -1) {
                this.isTransitioning = false;
                this.currentIndex = this.images.length - 1;
            } else {
                this.isTransitioning = false;
            }
        },
    },
};
</script>

<style scoped>
.slider {
    overflow: hidden;
    width: 800px;
    height: 400px;
    margin: auto;
    position: relative;
}

.slider-wrapper {
    display: flex;
}

.slide {
    min-width: 100%;
    box-sizing: border-box;
}

.slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>
