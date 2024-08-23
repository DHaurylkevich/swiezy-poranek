<template>
    <div class="home-section">
        <HeroSection id="home" />
        <!-- <InstructionSection />
        <FoodSetSection id="zestaw" /> -->
        <!-- <GallerySection id="gallery" /> -->
    </div>
</template>

<script>
import HeroSection from "./Hero.vue";
// import InstructionSection from "./Instruction.vue";
// import FoodSetSection from "./FoodSet.vue";
// import GallerySection from "./Gallery.vue";

export default {
    name: "HomeSection",
    components: {
        HeroSection,
        // InstructionSection,
        // FoodSetSection,
        // GallerySection,
    }
};
</script>

<style scoped>
.home-section {
    background-color: var(--primary-color);
}
</style>