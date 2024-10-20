<template>
    <div class="admin-foodset">
        <h1>Menu</h1>
        <div class="main-container">
            <button @click="startForm" class="btn">Dodaj menu</button>
        </div>
        <AdminMenu />

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3>{{ days[currentDayIndex] }}</h3>
            </template>

            <template #body>
                <form @submit.prevent="nextDay">
                    <div class="form-group">
                        <div v-for="(mealtime, mealIndex) in currentDayData" :key="mealIndex" class="form-group-meattime">
                            <label>Typ posiłku</label>
                            <input type="text" v-model="mealtime.type" placeholder="Śniadanie/Obiad" required />
                            <div v-for="(dish, dishIndex) in mealtime.dishes" :key="dishIndex" class="form-group-dish">
                                <label>Nazwa dania</label>
                                <input type="text" v-model="dish.name" placeholder="Nazwa" required />
                                <label>Kalorie</label>
                                <input type="number" v-model="dish.calories" placeholder=".. kcal" required />
                                <button @click="removeDish(mealIndex, dishIndex)" type="button" class="mini-btn dish">Usuń
                                    danie</button>
                            </div>
                            <button @click="addDish(mealIndex)" type="button" class="mini-btn dish">Dodaj danie</button>
                        </div>
                        <div class="btns">
                            <button @click="addMealtime" type="button" class="mini-btn mealtime">Dodaj posiłek</button>
                            <button @click="removeMealtime(mealIndex)" type="button" class="mini-btn mealtime">Usuń posiłek</button>
                        </div>
                    </div>
                </form>
            </template>

            <template #footer>
                <button v-if="!isFirstDay" @click="prevDay" class="btn">Powrót</button>
                <button @click="nextDay" class="btn">{{ isLastDay ? "Zapisz" : "Dalej" }}</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from "@/components/ui/Modal.vue";
import AdminMenu from "@/components/ui/MenuComponent.vue"
import { saveMenu } from "@/services/menuServices";

export default {
    name: "FoodSet",
    components: {
        AdminModal,
        AdminMenu
    },
    data() {
        return {
            days: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"],
            currentDayIndex: 0,
            formData: this.getEmptyFormData(),
            showModal: false,
            menu: []
        };
    },
    computed: {
        currentDayData() {
            return this.formData[this.currentDayIndex][0].mealtime;
        },
        isLastDay() {
            return this.currentDayIndex === this.days.length - 1;
        },
        isFirstDay() {
            return this.currentDayIndex === 0;
        }
    },
    methods: {
        getEmptyFormData() {
            return [
                [{ mealtime: [{ type: "Test", dishes: [] }], day: "Poniedziałek" }],
                [{ mealtime: [{ type: "Test", dishes: [] }], day: "Wtorek" }],
                [{ mealtime: [{ type: "Test", dishes: [] }], day: "Środa" }],
                [{ mealtime: [{ type: "Test", dishes: [] }], day: "Czwartek" }],
                [{ mealtime: [{ type: "Test", dishes: [] }], day: "Piątek" }]
            ];
        },
        addMealtime() {
            this.currentDayData.push({ type: "", dishes: [] });
        },
        removeMealtime() {
            if (this.currentDayData.length > 0) {
                this.currentDayData.splice(-1);
            }
        },
        addDish(mealIndex) {
            this.currentDayData[mealIndex].dishes.push({ name: "", calories: null });
        },
        removeDish(mealIndex, dishIndex) {
            this.currentDayData[mealIndex].dishes.splice(dishIndex, 1);
        },
        startForm() {
            this.showModal = true;
            this.currentDayIndex = 0;
        },
        nextDay() {
            if (this.isLastDay) {
                this.transformDataToObjects()
                this.saveAllData();
            } else {
                this.currentDayIndex++;
                console.log(this.menu)
            }
        },
        prevDay() {
            this.currentDayIndex--;
        },
        isDayFilled() {
            return this.currentDayData.length > 0 && this.currentDayData.some(mealtime => mealtime.dishes.length > 0);
        },
        transformDataToObjects() {
            const menu = this.formData.flat()
            return { menus: menu };
        },
        async saveAllData() {
            try {
                await saveMenu(this.transformDataToObjects());
                this.closeModal();
                alert("Gotowe!");
            } catch (e) {
                console.error("Błąd przy zapisywaniu menu:", e);
            }
        },
        closeModal() {
            this.showModal = false;
            this.formData = this.getEmptyFormData();
            this.currentDayIndex = 0;
            this.menu = [];
        },
    },
};
</script>

<style scoped>
.admin-foodset {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 20px;
}

.main-container {
    display: flex;
    justify-content: flex-start;
}

.btn {
    background-color: var(--primary-color);
    color: var(--background-color);
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.mini-btn {
    background-color: var(--background-color);
    font-weight: 700;
    color: var(--primary-color);
    border: 1.5px solid var(--primary-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.mealtime{
    width: 50%;
}

.mini-btn:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
}

.mini-btn.dish {
    background-color: var(--primary-color);
    color: var(--background-color);
}

.mini-btn.dish:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
}

.btns {
    display: flex;
    gap: 2%;
}

.form-group-meattime {
    margin-bottom: 16px;
}

.form-group-dish {
    margin-bottom: 8px;
}


input {
    width: 100%;
    padding: 8px;
    margin: 5px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
