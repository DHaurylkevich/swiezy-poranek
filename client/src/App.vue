<template>
  <router-view />
</template>

<script>
export default {
  name: "app",
  created() {
    this.loadPackages();
  },
  methods: {
    async loadPackages() {
      try {
        await this.$store.dispatch('loadPackages');
      } catch (error) {
        console.error('Failed to load packages', error);
      }
    }
  }
};
</script>
