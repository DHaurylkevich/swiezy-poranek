<template>
    <div v-if="menus" class="menu-section">
        <div class="section-header">
            <h2>Menu na tydzień</h2>
        </div>

        <div class="menu-list">
            <div v-for="(weekMenu, weekIndex) in menus.menu.menus" :key="weekIndex" class="menu">
                <h3 class="day">{{ weekMenu.day }}</h3>

                <div v-if="weekMenu.mealtime.length > 0" class="mealtime-list">
                    <div v-for="(mealtime, mealIndex) in weekMenu.mealtime" :key="mealtime._id" class="mealtime-container">
                        <p class="mealtime-type">{{ mealtime.type }}</p>

                        <ul class="dishes-list">
                            <li v-for="(dish, dishIndex) in mealtime.dishes" :key="dishIndex"
                                :class="{ 'selected-dish': isSelected(dish) }" @click="toggleDish(dish)"
                                class="dish-item" role="button">
                                <span class="dish-name">{{ dish.name }}</span>
                                <span class="dish-calories">{{ dish.calories }} ккал</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuSection",
    props: {
        menus: {
            type: Array,
            required: false,
            default: [],
        },
        selectedDishes: {
            type: Array,
            required: true, // Свойство должно быть передано от родителя
        }
    },
    methods: {
        toggleDish(dish) {
            // Проверяем, есть ли уже выбранное блюдо в массиве
            const dishIndex = this.selectedDishes.findIndex(selectedDish => selectedDish.name === dish.name);
            if (dishIndex === -1) {
                // Если блюда нет — добавляем его
                this.$emit('addToBasket', dish);
            } else {
                // Если блюдо есть — удаляем его
                this.$emit('removeFromBasket', dish);
            }
        },
        isSelected(dish) {
            // Проверяем, выбрано ли блюдо
            return this.selectedDishes.some(selectedDish => selectedDish.name === dish.name);
        }
    }
};
</script>

<style scoped>
.section-header h2 {
    margin-bottom: 8px;
    font-size: var(--font-size-medium);
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    border: 1px solid #efefef;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.day {
    font-weight: bold;
    text-align: center;
}

.mealtime-list {
    display: flex;
    gap: 8px;
}

.mealtime-type {
    font-size: var(--font-size-base);
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.8px;
    border-bottom: 2px solid #FCB825;
    margin-bottom: 8px;
    color: #FCB825;
}

.mealtime-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.dishes-list {
    list-style: none;
}

.dish-item {
    height: 6vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
    cursor: pointer;
}

.dish-item:hover {
    border: 1px solid #FCB825;
}

.selected-dish,
.selected-dish:hover {
    border: 1px solid #FCB825;
    border-left: 5px solid var(--primary-color);
}

.dish-name {
    font-weight: 500;
    color: var(--highlight-color);
}

.dish-calories {
    font-weight: 500;
    color: #9a9a9a;
}

@media (max-width: 768px) {
    .dish-item {
        height: auto;
    }

    .mealtime-list {
        flex-wrap: wrap;
    }
}

@media (min-width: 769px) and (max-width: 946px) {
    .dish-item {
        height: 10vw;
    }
}

@media(min-width: 947px) and (max-width: 1213px) {
    .dish-item {
        height: 8vw;
    }

    .mealtime-list {
        flex-wrap: wrap;
    }

    .mealtime-container {
        width: 49%;
    }
}
</style>
