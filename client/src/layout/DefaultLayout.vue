<template>
    <HeaderComponent />
    <main>
        <HomeSection />
        <InstructionSection />
        <FoodSetSection />
        <!-- <BlogSection/> -->
        <GallerySection />
    </main>
    <FooterComponent />
</template>
<script>
import FooterComponent from '@/components/Footer.vue';
import HeaderComponent from '@/components/Header.vue';
import HomeSection from "../views/home/Home.vue";
import InstructionSection from "../views/home/Instruction.vue";
import FoodSetSection from "../views/home/FoodSet.vue";
// import BlogSection from "../views/home/Blog.vue";
import GallerySection from "../views/home/Gallery.vue";


export default {
    name: "DefaultLayout",
    components: {
        FooterComponent,
        HeaderComponent,
        HomeSection,
        InstructionSection,
        FoodSetSection,
        GallerySection,
        // BlogSection
    }
};
</script>

<style>
main {
    flex: 1;
    background-color: var(--primary-color);
}
</style>
