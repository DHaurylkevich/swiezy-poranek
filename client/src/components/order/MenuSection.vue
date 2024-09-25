<template>
    <div>
        <div class="section-header">
            <h3>Menu na tydzień</h3>
        </div>
        <PackageCard :title="dsa"></PackageCard>
        <div v-for="(menu, index) in menus" :key="index" class="menu-list">
            <div class="menus">
                <div v-for="(weekMenu, weekIndex) in menu.menus" :key="weekIndex" class="menu">
                    <div class="title">
                        <p class="day">{{ weekMenu.day }}</p>
                    </div>
                    <div v-if="weekMenu.mealtime.length > 0">
                        <table class="menu-table">
                            <thead>
                                <tr>
                                    <th>Posiłek</th>
                                    <th>Dania</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(mealtime, mealIndex) in weekMenu.mealtime" :key="mealtime._id"
                                    class="mealtime-row">
                                    <td>{{ mealtime.type }}</td>
                                    <td v-if="mealtime.dishes.length > 0">
                                        <ul class="dishes-list">
                                            <li v-for="(dish, dishIndex) in mealtime.dishes" :key="dishIndex">
                                                <span class="dish-name">{{ dish.name }}</span> —
                                                <span class="dish-calories">{{ dish.calories }} ккал</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td v-else colspan="2" class="no-data">Нет данных</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p>Меню на этот день пока не добавлено</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PackageCard from '@/components/order/PackageCard.vue';

export default {
    name: "MenuSection",
    components:{
        PackageCard
    },
    props: {
        menus:{
            type: Array,
            require: false
        }
    },
    data() {
        return {
            menuList: [],
            formData: "",
        };
    },
    methods: {
        formatMenu(menu) {
            return Object.keys(menu).map(day => menu[day]);
        }
    },
};
</script>

<style scoped>
.main-title {
    font-size: var(--font-size-large);
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 30px;
}

.title {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.icon-button img {
    width: 100%;
    height: 16px;
    vertical-align: middle;
}

.day {
    font-size: 28px;
    color: var(--secondary-color);
}

.mini-btn {
    background-color: #dc3545;
    border: 1px solid #dc3545;
    color: var(--background-color);
    font-weight: bold;
}

.mini-btn:hover {
    border: 1px solid #dc3545;
    background-color: var(--background-color);
    color: #dc3545;
    transition: background-color 0.2s ease;
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}



.menus {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    gap: 5vw;
}

.menu {
    width: 20vw;
}

.menu-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    background-color: var(--table-background);
    border-radius: 10px;
    overflow: hidden;
}

.menu-table th {
    background-color: var(--primary-color);
    color: #fff;
    padding: 15px;
    text-align: left;
    font-size: 16px;
}

.menu-table td {
    padding: 15px;
    text-align: left;
    font-size: 14px;
    color: var(--text-color);
}

.menu-table thead tr {
    position: sticky;
    top: 0;
}

.mealtime-row:hover {
    background-color: var(--hover-background);
}

.dishes-list {
    list-style: none;
    padding: 0;
}

.dish-name {
    font-weight: bold;
    color: var(--highlight-color);
}

.dish-calories {
    color: var(--text-secondary);
}

.no-data {
    color: var(--error-color);
    font-style: italic;
}

@media (max-width: 768px) {

    .menu-table th,
    .menu-table td {
        padding: 10px;
    }

    h1,
    h2 {
        font-size: 24px;
    }
}

/* Темы */
:root {
    --primary-color: #4caf50;
    --secondary-color: #2e7d32;
    --background-color: #f9f9f9;
    --table-background: #fff;
    --text-color: #333;
    --hover-background: #f1f1f1;
    --highlight-color: #ff5722;
    --text-secondary: #757575;
    --error-color: #f44336;
}

.dark-theme {
    --primary-color: #1a73e8;
    --secondary-color: #0039cb;
    --background-color: #121212;
    --table-background: #1e1e1e;
    --text-color: #fff;
    --hover-background: #2a2a2a;
    --highlight-color: #ff9100;
    --text-secondary: #c7c7c7;
    --error-color: #ff6f61;
}
</style>
