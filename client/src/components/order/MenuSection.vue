<template>
    <div v-if="menus">
        <div class="section-header">
            <h3>Menu na tydzień</h3>
            <!-- {{ menus.menu }} -->
        </div>
        <div v-for="(weekMenu, weekIndex) in menus.menu.menus" :key="weekIndex" class="menu">
            <p class="day">{{ weekMenu.day }}</p>
            <div v-if="weekMenu.mealtime.length > 0">
                <div v-for="(mealtime, mealIndex) in weekMenu.mealtime" :key="mealtime._id" class="mealtime-row">
                    <p>{{ mealtime.type }}</p>
                    <div v-if="mealtime.dishes.length > 0">
                        <div class="dishes-list">
                            <li v-for="(dish, dishIndex) in mealtime.dishes" :key="dishIndex"
                                :class="{ 'selected-dish': selectedDish === dish }" @click="selectDish(dish)"
                                class="dish-item" role="button" aria-pressed="false">
                                <span class="dish-name">{{ dish.name }}</span> —
                                <span class="dish-calories">{{ dish.calories }} ккал</span>
                            </li>
                        </div>
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
        }
    },
    data() {
        return {
            selectedDish: null,
        };
    },
    methods: {
        selectDish(dish) {
            this.selectedDish = dish;
        },
        formatMenu(menu) {
            return Object.keys(menu).map(day => menu[day]);
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

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.day {
    font-size: var(--font-size-large);
    color: var(--secondary-color);
    margin-bottom: 20px;
}

/* .menu-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
} */

.menu {
    display: flex;
    flex-wrap: wrap;
    gap: 5vw;
}

.menus {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid #efefef;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 20vw;
}

.dishes-list {
    list-style: none;
    padding: 0;
}

.dish-item {
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
}

.dish-item:hover {
    background-color: #e0f7fa;
}

.selected-dish {
    background-color: #c8e6c9;
    border-left: 5px solid var(--primary-color);
}

.dish-name {
    font-weight: bold;
    color: var(--highlight-color);
}

.dish-calories {
    color: var(--text-secondary);
}

/* Темы */
:root {
    --primary-color: #4caf50;
    --secondary-color: #2e7d32;
    --background-color: #f9f9f9;
    --text-color: #333;
    --highlight-color: #ff5722;
    --text-secondary: #757575;
}

@media (max-width: 768px) {
    .menu {
        flex: 0 1 calc(100% - 32px);
    }
}
</style>