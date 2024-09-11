<template>
    <div class="home-section">
        <HeroSection id="home"/>
        <InstructionSection />
        <FoodSetSection id="zestawy" />
        <GallerySection id="gallery" />
    </div>
</template>

<script>
import HeroSection from "./Hero.vue";
import InstructionSection from "./Instruction.vue";
import FoodSetSection from "./Package.vue";
import GallerySection from "./Gallery.vue";

export default {
    name: "HomeSection",
    components: {
        HeroSection,
        InstructionSection,
        FoodSetSection,
        GallerySection,
    },
    mounted() {
        this.initIntersectionObserver();
    },
    beforeUnmount() {
        if (this.observer) {
            this.$store.commit('SET_SECTION', "");
            this.observer.disconnect();
        }
    },
    methods: {
        initIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.7
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.$store.commit('SET_SECTION', entry.target.id);
                    }
                });
            }, options);

            document.querySelectorAll('.home-section > *').forEach(section => {
                this.observer.observe(section);
            });
        }
    }
};
</script>

<style scoped>
.home-section {
    background-color: var(--primary-color);
}
</style>