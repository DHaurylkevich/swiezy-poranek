<template>
    <div class="basket">
        <h2>Koszyk</h2>
        <ul class="basket-items">
            <li v-for="(item, index) in basketItems" :key="index" class="basket-item">
                <div class="item-details">
                    <span v-if="item.type !== ''" class="item-title">{{ item.title }}</span>
                    <span v-else class="item-title">{{ item.title }} - {{ item.type }} - {{ item.period }}</span>
                </div>
                <div class="container">
                    <span class="item-price">{{ item.price }}</span>
                    <button class="delete" @click="removeItem(index)">X</button>
                </div>
            </li>
        </ul>
        <div class="basket-total">
            <span>Do zapłaty:</span>
            <span class="total-price">{{ totalPrice }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: "BasketComponent",
    computed: {
        totalPrice() {
            if (!this.basketItems) {
                return 0;
            }
            const price = this.basketItems.reduce((sum, item) => sum + item.price, 0);
            return new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
            }).format(price);
        },
        ...mapState({
            basketItems: state => state.basketItems
        })
    },
    methods: {
        ...mapMutations(['removeFromBasket']),
        removeItem(index) {
            this.removeFromBasket(index);
        }
    }
}
</script>


<style scoped>
.basket {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border: 1px solid #ddd;
    border-radius: 16px;
    max-height: 312px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.basket h2 {
    font-size: var(--font-size-medium);
}

.basket-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    list-style: none;
    margin: 16px 0;
    padding: 0;
}

.basket-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 12px;
    padding: 12px 16px;
    transition: background-color 0.3s;
}

.basket-item:hover {
    background-color: #e8e8e8;
}

.item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.item-title {
    font-size: var(--font-size-base);
    font-weight: bold;
}

.item-price {
    font-size: var(--font-size-base);
    font-weight: bold;
    color: var(--primary-color);
}

.delete {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: red;
    font-size: 1.2em;
    font-weight: bold;
}

.container {
    display: flex;
    align-items: center;
    gap: 12px;
}

.basket-total {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #333;
    font-size: var(--font-size-base);
    font-weight: bold;
    border-top: 1.5px solid #ddd;
    padding-top: 12px;
}

.total-price {
    font-weight: bold;
    color: var(--primary-color);
}
</style>
