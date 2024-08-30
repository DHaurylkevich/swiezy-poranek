<template>
  <div>
    <div class="section-header">
      <h3>{{ sectionTitle }}</h3>
    </div>
    <div class="packages-list">
      <PackageCard v-for="(pkg, index) in packages" :key="index" :title="pkg.title" :image="pkg.image" :price="pkg.price"
        @click="handleToggleSelect(pkg)" :isSelected="pkg === selected" />
    </div>
  </div>
</template>

<script>
import PackageCard from '@/components/order/PackageCard.vue';

export default {
  name: 'PackageSection',
  components: {
    PackageCard
  },
  props: {
    sectionTitle: {
      type: String,
      required: true
    },
    packages: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(pkg => 'title' in pkg && 'image' in pkg);
      }
    },
    selected: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleToggleSelect(pkg) {
      this.$emit('addToBasket', pkg);
    }
  }
};
</script>

<style scoped>
.section-header {
  margin-bottom: 8px;
}

.section-header h2 {
  font-size: var(--font-size-medium);
}

.packages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
