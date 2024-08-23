<template>
    <section class="select-addons">
        <PackageSection class="package" sectionTitle="Dodatki" :packages="addons"
            @addToBasket="selectAddons" />
    </section>
</template>

<script>
import PackageSection from '@/components/order/PackageSection.vue';
import { mapMutations } from 'vuex';

export default {
    components: {
        PackageSection
    },
    data() {
        return {
            addons: [
                { title: "Sok pomaranczowy", price: 15 },
                { title: "Sok pomaranczowy", price: 15 },
                { title: "Sok pomaranczowy", price: 15 }
            ]
        }
    },
    methods: {
        ...mapMutations(['addToBasket']),
        selectAddons(addon) {
            this.addToBasket(addon)
        }
    }
}
</script>