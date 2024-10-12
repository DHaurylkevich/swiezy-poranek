<template>
  <div>
    <div class="section-header">
      <h3>{{ sectionTitle }}</h3>
    </div>
    <div class="packages-list">
      <PackageCard v-for="(pkg, index) in filteredPackages" :key="index" :title="pkg.title" :image="filterType === 'dodatki'? '' :pkg.url || ''"
        :price="pkg.price || 0" :description="pkg.description || ''" @click="handleToggleSelect(pkg, index)"
        :isSelected="selected && pkg.title === selected.title">
      </PackageCard>
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
      default: () => null
    },
    filterType: {
      type: String,
      required: false,
    }
  },
  computed: {
    filteredPackages() {
      if (this.filterType === "zestawy") {
        console.log(this.packages);
        return this.packages.filter(pkg => pkg.type === "Zestaw");
      }else if (this.filterType === "dodatki"){
        return this.packages.filter(pkg => pkg.type === "Dodatek")
      }else{
        return this.packages
      }
    }
  },
  methods: {
    handleToggleSelect(pkg, index) {
      const eventPayload = {
        index,
        title: pkg.title,
        menu: pkg.menu,
      };
      if (pkg.price) {
        eventPayload.price = pkg.price;
      }
      this.$emit('addToBasket', eventPayload);
    }
  }
};
</script>


<style scoped>
.section-header {
  margin-bottom: 8px;
}

.section-header h3 {
  font-size: var(--font-size-large);
}

.packages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
