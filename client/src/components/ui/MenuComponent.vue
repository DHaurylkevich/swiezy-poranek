<template>
    <div class="menu-container">
        <div v-for="(menu, index) in menuList" :key="index" class="menu-list">
            <h3 class="one-menu">Menu {{ menu.position }}</h3>
            <button @click="deleteMenuById(menu._id)" class="mini-btn">Usuń menu</button>
            <div class="menus">
                <div v-for="(weekMenu, weekIndex) in menu.menus" :key="weekIndex" class="menu">
                    <div class="title">
                        <p class="day">{{ weekMenu.day }}</p>
                        <button @click="openModal(weekMenu)" class="icon-button">
                            <img src="@/assets/icons/pen-svgrepo-com.svg" alt="Редактировать">
                        </button>
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
                                                <span class="dish-calories">{{ dish.calories }} kcal</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td v-else colspan="2" class="no-data">Nie ma nic</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p>Menu na ten dzien jeszcze niema</p>
                    </div>
                </div>
            </div>
        </div>

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3>Zmodyfikować {{ this.formData.day }}</h3>
            </template>

            <template #body>
                <form @submit.prevent="updateMenu" class="modal-form">
                    <div class="form-group">
                        <div v-for="(mealtime, mealtimeIndex) in formData.mealtime" :key="mealtime._id"
                            class="mealtime-group">
                            <label class="meal-title">Typ posiłku</label>
                            <input type="text" v-model="mealtime.type" placeholder="Śniadanie/Obiad" required
                                class="form-input" />
                            <button type="button" @click="removeMealtime(mealtimeIndex)" class="btn-danger">Usuń</button>

                            <div v-for="(dish, dishIndex) in mealtime.dishes" :key="dishIndex" class="dish-group">
                                <!-- <div class="dish-list"> -->
                                <label>Nazwa dania</label>
                                <input type="text" v-model="dish.name" placeholder="Nazwa" required class="form-input" />
                                <label>Kalorie</label>
                                <input type="number" v-model="dish.calories" placeholder=".. kcal" required
                                    class="form-input" />
                                <!-- </div> -->
                                <button type="button" @click="removeDish(mealtimeIndex, dishIndex)"
                                    class="btn-danger">Usuń</button>
                            </div>

                            <button type="button" @click="addDish(mealtimeIndex)" class="btn-primary">Dodaj danie</button>
                        </div>
                    </div>

                    <button type="button" @click="addMealtime" class="btn-primary">Dodaj posiłek</button>
                </form>
            </template>

            <template #footer>
                <button @click="closeModal" class="btn-secondary">Zamknij</button>
                <button @click="updateMenu" class="btn-primary">Zmodyfikowacj</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from "@/components/ui/Modal.vue";
import { deleteMenu, getMenu, updatedDayMenu } from "@/services/menuServices";

export default {
    name: "WeekMenu",
    components: {
        AdminModal
    },
    data() {
        return {
            menuList: [],
            showModal: false,
            formData: "",
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
                this.menuList = this.formatMenu(response);
                console.log(this.menuList);
            } catch (error) {
                console.error("Ошибка загрузки меню:", error);
            }
        },
        formatMenu(menu) {
            return Object.keys(menu).map(day => menu[day]);
        },
        async updateMenu() {
            console.log(this.formData.mealtime);
            await updatedDayMenu(this.formData._id, this.formData);
            await this.loadMenu();
            this.showModal = false;
        },
        addMealtime() {
            this.formData.mealtime.push({
                type: '',
                dishes: []
            });
        },
        addDish(mealtimeIndex) {
            this.formData.mealtime[mealtimeIndex].dishes.push({
                name: '',
                calories: 0
            });
        },
        removeMealtime(mealtimeIndex) {
            this.formData.mealtime.splice(mealtimeIndex, 1);
        },
        removeDish(mealtimeIndex, dishIndex) {
            this.formData.mealtime[mealtimeIndex].dishes.splice(dishIndex, 1);
        },
        async deleteMenuById(id) {
            await deleteMenu(id)
            await this.loadMenu();
        },
        openModal(row) {
            this.formData = { ...row };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.formData = "";
        },
    },
};
</script>

<style scoped>
.menu-container {
    padding: 20px;
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.menus {
    display: flex;
    flex-wrap: wrap;
    gap: 5vw;
}

.menu {
    width: 100%;
    max-width: 20vw;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.day {
    font-size: 24px;
    color: var(--secondary-color);
    font-weight: bold;
}

.meal-title {
    font-weight: bold;
}

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.icon-button img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}

.dish-list {
    display: flex;
    flex-direction: column;
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

.btn-danger,
.btn-primary,
.btn-secondary {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
}

.mini-btn {
    border: none;
    transition: background-color 0.3s, color 0.3s;
}

.mini-btn,
.btn-danger {
    background-color: #d9534f;
    color: #fff;
}

.mini-btn:hover,
.btn-danger:hover {
    background-color: #c9302c;
}

.btn-primary {
    background-color: var(--primary-color);
    color: #fff;
}

.btn-primary:hover {
    background-color: var(--primary-color);
}

.btn-secondary {
    background-color: var(--primary-color);
    color: #fff;
}

.btn-secondary:hover {
    background-color: var(--primary-color);
}

.modal-title {
    text-align: center;
    margin-bottom: 20px;
}

.modal-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.mealtime-group {
    margin-bottom: 20px;
}

.meal-title {
    font-weight: bold;
    margin: 10px 0;
}

.form-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
}

.form-input:focus {
    border-color: var(--primary-color);
    outline: none;
}

.dish-group {
    margin-bottom: 15px;
}

.dishes-list {
    list-style: none;
    padding: 0;
}

.dish-name {
    font-weight: bold;
}

.dish-calories {
    color: #666;
}

.no-data {
    color: #999;
    font-style: italic;
}

@media (max-width: 768px) {
    .menu {
        width: 100%;
        margin-bottom: 20px;
    }

    .menu-table th,
    .menu-table td {
        padding: 10px;
    }

    h1,
    h2 {
        font-size: 24px;
    }
}
</style>
