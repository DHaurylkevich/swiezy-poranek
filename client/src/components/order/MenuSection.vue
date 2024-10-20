<template>
    <div v-if="menus" class="menu-section">
        <div class="section-header">
            <h2>Menu na tydzień</h2>
        </div>

        <div class="menu-list">
            <div v-for="(weekMenu, weekIndex) in menus.menu.menus" :key="weekIndex" class="menu">
                <h3 class="day">{{ weekMenu.day }}</h3>

                <div v-if="weekMenu.mealtime.length > 0" class="mealtime-list">
                    <div v-if="weekMenu.mealtime[0].dishes.length" v-for="(mealtime, mealIndex) in weekMenu.mealtime"
                        :key="mealtime._id" class="mealtime-container">
                        <p class="mealtime-type">{{ mealtime.type }}</p>
                        <ul class="dishes-list">
                            <li v-for="(dish, dishIndex) in mealtime.dishes" :key="dish._id"
                                :class="{ 'selected-dish': isSelected(`${weekIndex}${mealIndex}${dishIndex}`) }"
                                @click="toggleDish(false, dish.name, weekMenu.day, dish.calories, `${weekIndex}${mealIndex}${dishIndex}`)"
                                class="dish-item" role="button">
                                <span class="dish-name">{{ dish.name }}</span>
                                <span class="dish-calories">{{ dish.calories }} kcal</span>
                            </li>
                        </ul>
                    </div>
                    <div v-else v-for="(mealtime, mealIndex) in weekMenu.mealtime" :key="mealIndex"
                        class="mealtime-container-minimal">
                        <ul class="dishes-list">
                            <li :key="mealtime._id" :class="{ 'selected-dish': isSelected(`${weekIndex}${mealIndex}`) }"
                                @click="toggleDish(true, mealtime.type, weekMenu.day, dish?.calories, `${weekIndex}${mealIndex}`)"
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
        toggleDish(filterMealtime, menuItem, weekDay, calories, indexes) {
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
                    index: indexes,
                    calories: calories
                };
            }
            this.$emit('addToBasket', menuItemStruct);
            console.log(indexes)
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
    flex-wrap: wrap;
    /* justify-content: space-between; */
    gap: 2%;
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

.mealtime-container,
.mealtime-container-minimal {
    display: flex;
    flex-direction: column;
}

.mealtime-container {
    width: 32%;
}

.mealtime-container-minimal {
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
    height: 7.5vw;
}

/* .dish-item-minimal{
    color: #FCB825;
} */

.dish-item-minimal:hover,
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
    .mealtime-container {
        width: 100%;
    }

    .dish-item {
        height: auto;
    }
}

@media (min-width: 769px) and (max-width: 946px) {
    .mealtime-container {
        width: 49%;
    }

    .dish-item {
        height: 13vw;
    }

    .mealtime-list {
        gap: 2%;
    }
}

@media(min-width: 947px) and (max-width: 1213px) {

    .mealtime-container {
        width: 49%;
    }

    .dish-item {
        height: 10vw;
    }
}

@media(min-width: 1214px) and (max-width: 1383px) {
    .dish-item {
        height: 8vw;
    }

    .mealtime-list {
        flex-wrap: wrap;
    }
}
</style>
