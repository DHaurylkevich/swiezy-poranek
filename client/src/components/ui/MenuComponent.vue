<template>
    <div class="menu-container">
        <h1>Меню на неделю</h1>
        <div v-for="(day, index) in weekMenu" :key="index" class="day-menu">
            <h2>День {{ index + 1 }}</h2>
            <div v-if="day.length > 0">
                <table class="menu-table">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Блюдо</th>
                            <th>Калории</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dish in day" :key="dish._id" class="dish-row">
                            <td>{{ dish.type }}</td>
                            <td>{{ dish.name }}</td>
                            <td>{{ dish.calories }} ккал</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Меню на этот день пока не добавлено</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getMenu  }from "@/services/menuServices";

export default {
    name: "WeekMenu",
    data() {
        return {
            weekMenu: [],
        };
    },
    async created() {
        await this.loadMenu();
    },
    methods: {
        async loadMenu() {
            try {
                const response = await getMenu();
                console.log(response);
                this.weekMenu = this.formatMenu(response);
                console.log(this.weekMenu);
            } catch (error) {
                console.error("Ошибка загрузки меню:", error);
            }
        },
        formatMenu(menu) {
            return Object.keys(menu).map(day => menu[day].menus);
        },
    },
};
</script>

<style scoped>
.menu-container {
    padding: 20px;
    background-color: #f9f9f9;
}

.day-menu {
    margin-bottom: 30px;
}

.menu-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.menu-table th,
.menu-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.dish-row:hover {
    background-color: #f1f1f1;
}

h2 {
    font-size: 24px;
    color: var(--primary-color);
}
</style>
  