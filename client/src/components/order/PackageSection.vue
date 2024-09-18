<template>
  <div>
    <div class="section-header">
      <h3>{{ sectionTitle }}</h3>
    </div>
    <div class="packages-list">
      <PackageCard v-for="(pkg, index) in packages" :key="index" :title="pkg.title" :image="pkg.image || ''"
        :price="pkg.price || 0" :description="pkg.description || ''" @click="handleToggleSelect(pkg, index)"
        :isSelected="selected && pkg.title === selected.title"/>
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
    },
    selected: {
        type: Object,
        default: null
      }
  },
  methods: {
    handleToggleSelect(pkg, index) {
      console.log(index)
      if (pkg.price) {
        this.$emit('addToBasket', {
          index: index,
          title: pkg.title,
          price: pkg.price
        });
      } else {
        this.$emit('addToBasket', {
          index: index,
          title: pkg.title,
        });
      }
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
