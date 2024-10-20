<template>
    <div class="basket">
        <h2>Koszyk</h2>
        <ul class="basket-items">
            <li v-for="(item, index) in basketItems" :key="index" class="basket-item">
                <div class="item-details">
                    <div class="title-calories">
                        <div class="item-title">{{ item.title }}</div>
                        <span v-if="item.dishes[0].calories" class="item-calories">{{ totalCalories(item.dishes) }}
                            kcal</span>
                    </div>
                    <details v-if="item.dishes" name="faq">
                        <summary class="toggle-button">Szczegóły</summary>
                        <ul class="dish-list">
                            <li v-for="(group, day) in groupDishesByDay(item.dishes)" :key="day">
                                <p>{{ day }}:</p>
                                <ul v-for="(dish, dishIndex) in group" :key="dishIndex">
                                    - {{ 'type' in dish ? dish.type : dish.name }}
                                </ul>
                            </li>
                        </ul>
                    </details>
                    <div v-if="item.type" class="item-type">Rodzaj: {{ item.type }}</div>
                    <div v-if="item.period" class="item-period">Okres: {{ item.period }}</div>
                    <div v-if="item.count" class="item-count">Ilość: {{ item.count }}</div>
                </div>
                <div class="cost">
                    <span class="item-price">{{ item.price }}</span>
                    <button class="delete" @click="removeItem(index)">
                        <i>X</i>
                    </button>
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
        ...mapState({
            basketItems: state => state.basketItems
        }),
        totalPrice() {
            const price = this.basketItems.reduce((sum, item) => {
                const uniqueDays = new Set(item.dishes.map(dish => dish.day));
                const dayCount = uniqueDays.size;

                return sum + (item.price * dayCount * item.count);
            }, 0);
            return new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
            }).format(price);
        }
    },
    methods: {
        ...mapMutations(['removeFromBasket']),
        removeItem(index) {
            this.removeFromBasket(index);
        },
        totalCalories(dishes) {
            console.log(dishes)
            return dishes.reduce((acc, dish) => acc + dish.calories, 0);
        },
        formatDays(days) {
            const dayNames = {
                "Poniedziałek": "Pon",
                "Wtorek": "Wto",
                "Środa": "Śro",
                "Czwartek": "Czw",
                "Piątek": "Pią",
            };

            const formattedDays = days.map(day => dayNames[day] || day);
            return formattedDays.join(", ");
        },
        groupDishesByDay(dishes) {
            return dishes.reduce((acc, dish) => {
                if (!acc[dish.day]) {
                    acc[dish.day] = [];
                }
                acc[dish.day].push(dish);
                return acc;
            }, {});
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
    width: 100%;
    padding: 16px;
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
}

.basket-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 12px;
    padding: 12px 16px;
    gap: 16px;
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

.title-calories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.item-title {
    font-size: var(--font-size-base);
    font-weight: bold;
}

.item-type,
.item-period,
.item-count {
    font-size: 0.9rem;
    color: #585757;
    margin-left: 0.5vw;
}

.item-calories {
    font-size: 0.9rem;
    color: #585757;
}

.item-price {
    font-weight: bold;
    color: var(--primary-color);
}

.delete {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: red;
    font-size: var(--font-size-base);
    font-weight: bold;
}

.cost {
    display: flex;
    align-items: center;
    gap: 8px;
}

.toggle-button {
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
    gap: 4px;
}

.dish-list {
    padding-left: 16px;
}

.dish-item {
    font-size: 0.9rem;
    margin-left: 0.5vw;
}

.basket-total {
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: #333;
    font-size: var(--font-size-base);
    font-weight: bold;
    border-top: 1.5px solid #ddd;
    padding-top: 12px;
}

.total-price {
    font-weight: bold;
    font-size: var(--font-size-base);
    color: var(--primary-color);
}

@media (max-width: 576px) {
    .basket {
        width: 100%;
    }

    .basket-item {
        padding: 16px 24px;
    }

    .item-price,
    .item-title {
        font-size: var(--font-size-medium);
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .basket {
        width: 35vw;
        padding-inline: 8px;

    }

    .basket-item {
        padding-inline: 8px;
        gap: 4px
    }

    .cost {
        gap: 4px;
    }

    .title-calories {
        gap: 4px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .basket {
        width: 28vw;
        padding: 16px;
    }

    .title-calories {
        gap: 4px;
    }
}
</style>
