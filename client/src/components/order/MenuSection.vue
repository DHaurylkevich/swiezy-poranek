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
                        <div v-if="mealtime.dishes.length">
                            <p class="mealtime-type">{{ mealtime.type }}</p>
                            <ul class="dishes-list">
                                <li v-for="(dish, dishIndex) in mealtime.dishes" :key="dish._id"
                                    :class="{ 'selected-dish': isSelected(`${dishIndex}${mealIndex}${weekIndex}`) }"
                                    @click="toggleDish(false, dish.name, weekMenu.day, `${dishIndex}${mealIndex}${weekIndex}`)"
                                    class="dish-item" role="button">
                                    <span class="dish-name">{{ dish.name }}</span>
                                    <span class="dish-calories">{{ dish.calories }} kcal</span>
                                </li>
                            </ul>
                        </div>
                        <ul v-else class="dishes-list minimal">
                            <li :key="mealtime._id" :class="{ 'selected-dish': isSelected(`${weekIndex}${mealIndex}`) }"
                                @click="toggleDish(true, mealtime.type, weekMenu.day, `${weekIndex}${mealIndex}`)"
                                class="dish-item-minimal" role="button">
                                <span class="dish-name">{{ mealtime.type }}</span>
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
            type: Object,
            required: false,
            default: {},
        },
        selectedDishes: {
            type: Array,
            required: true,
        }
    },
    methods: {
        toggleDish(filterMealtime, menuItem, weekDay, indexes) {
            let menuItemStruct;
            if (filterMealtime) {
                menuItemStruct = {
                    type: menuItem,
                    day: weekDay,
                    index: indexes
                };
            } else {
                menuItemStruct = {
                    name: menuItem,
                    day: weekDay,
                    index: indexes
                };
            }
            this.$emit('addToBasket', menuItemStruct);
        },
        isSelected(index) {
            return this.selectedDishes.some(selectedDish => selectedDish.index === index);
        }

    }
};
</script>

<style scoped>
.section-header h2 {
    margin-bottom: 16px;
    font-size: var(--font-size-large);
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

.dish-item-minimal,
.dish-item {
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

.dish-item {
    height: 6vw;
}

/* .dish-item-minimal{
    color: #FCB825;
} */

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
