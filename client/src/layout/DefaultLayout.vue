<template>
    <HeaderComponent />
    <main>
        <router-view />
    </main>
    <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/common/Header.vue';
import FooterComponent from '@/components/common/Footer.vue';

export default {
    name: "DefaultLayout",
    components: {
        HeaderComponent,
        FooterComponent,
    }
};
</script>