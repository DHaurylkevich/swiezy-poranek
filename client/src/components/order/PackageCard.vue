<template>
    <div class="package-card" :class="{ 'selected': isSelected }">
        <img v-if="image" :src=image :alt="title" class="package-image" />
        <div class="package-details">
            <p class="package-title">{{ title }}</p>
            <ToolTip v-if="description">
                <template #content>
                    {{ description }}
                </template>
                <p>Opis</p>
            </ToolTip>
            <p v-if="this.price" class="package-price">{{ formattedPrice }}</p>
        </div>
    </div>
</template>

<script>
import ToolTip from "../ui/tooltip.vue";

export default {
    components: {
        ToolTip
    },
    name: "PackageCard",
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
        description: {
            type: String,
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
    }
};
</script>

<style scoped>
.package-card {
    display: flex;
    flex: 0 1 calc(35% - 26px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid #efefef;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card:hover{
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.package-card.selected {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

.package-image {
    width: 56%;
    height: auto;
    object-fit: cover;
}

.package-details {
    text-align: center;
    font-size: var(--font-size-base);
}

.package-title {
    color: var(--text-color);
    /* font-size: var(--font-size-base); */
    font-weight: bold;
}

.package-price {
    font-weight: bold;
    color: var(--primary-color);
}

@media (max-width: 425px) {
    .package-card {
        flex: 0 1 calc(50% - 8px);
        padding: var(--font-size-base);
    }

    .package-details {
        text-align: center;
        font-size: var(--font-size-base);
    }

    .package-image {
        width: 80%;
    }
}

@media (min-width: 426px) and (max-width: 577px) {
    .package-card {
        flex: 0 1 calc(35% - 20px);
        padding: var(--font-size-base);
    }

    .package-details {
        text-align: center;
        font-size: var(--font-size-base);
    }

    .package-image {
        width: 80%;
    }
}

@media (min-width: 578px) and (max-width: 768px) {
    .package-card {
        flex: 0 1 calc(50% - 8px);
    }

    .package-image {
        width: 72%;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .package-card {
        flex: 0 1 calc(35% - 24px);
    }

    .package-details {
        text-align: center;
        font-size: var(--font-size-base);
    }

    .package-image {
        width: 72%;
    }
}
</style>
