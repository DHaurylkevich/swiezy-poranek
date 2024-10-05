<template>
    <section class="order-section select-addons">
        <PackageSection class="package" sectionTitle="Dodatki" :packages="packages" filterType="dodatki"
            @addToBasket="selectAddons" />
    </section>
</template>

<script>
import PackageSection from '@/components/order/PackageSection.vue';
import { mapMutations, mapGetters } from "vuex";

export default {
    components: {
        PackageSection
    },
    data() {
        return {
            addons: [
                { title: "Sok pomaranczowy", price: 15 },
            ]
        }
    },
    computed: {
        ...mapGetters(["packages"]),
    },
    methods: {
        ...mapMutations(['addToBasket']),
        selectAddons(addon) {
            this.addToBasket(addon)
        }
    }
}
</script>

<style scoped>
/* @media(min-width: 578px) and (max-width: 768px){
    .select-addons {
        width: 60%;
    }
}
@media(min-width: 769px){
    .select-addons {
        width: 70%;
    }
} */
</style>