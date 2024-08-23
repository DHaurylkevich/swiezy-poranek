<template>
    <div class="package-card"
        @click="addToBasket" 
        :class="{ 'selected': isSelected }"
        >
        <img  v-if="image" :src=image :alt="title" class="package-image" />
        <div class="package-details">
            <h3 class="package-title">{{ title }}</h3>
            <p v-if="this.price" class="package-price">{{ formattedPrice }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PackageCard',
    props: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
            }).format(this.price);
        }
    },
    methods: {
        addToBasket() {
            this.$emit('addToBasket', {
                title: this.title,
                image: this.image,
                price: this.price
            });
        }
    }
};
</script>

<style scoped>
.package-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    border: 1px solid #efefef;
    border-radius: 16px;
    overflow: hidden;
    width: var(--wight-card);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.package-card.selected {
    border-color: var(--primary-color);
    transform: scale(1.05);
}
.package-image {
    width: 128px;
    height: auto;
    object-fit: cover;
}

.package-details {
    text-align: center;
}

.package-title {
    font-size: var(--font-size-medium);
    color: var(--text-color);
}

.package-price {
    font-size: var(--font-size-medium);
    font-weight: bold;
    color: var(--primary-color);
}
</style>
