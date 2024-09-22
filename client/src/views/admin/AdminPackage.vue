<template>
    <div class="admin-foodset">
        <h1>Zestawy</h1>
        <div class="main-container">
            <button @click="openModal('add')" class="btn">Utwórz</button>
            <div class="cards-container">
                <div v-for="(pkg, index) in packages" :key="index" class="card">
                    <Card :title="pkg.title" :image="pkg.url" :price="pkg.price" :description="pkg.description"
                        :buyButton="false" />
                    <div class="buttons">
                        <button @click="openModal('edit', pkg)" class="mini-btn">Edytuj</button>
                        <button @click="openModal('delete', pkg)" class="mini-btn">Usuń</button>
                    </div>
                </div>
            </div>
        </div>

        <AdminModal :is-visible="showModal" @close="closeModal">
            <template #header>
                <h3>{{ modalTitle }}</h3>
            </template>

            <template #body>
                <form v-if="currentAction !== 'delete'" @submit.prevent="handleSubmit">
                    <div v-for="(field, index) in fields" :key="index" class="form-group">
                        <label :for="field">{{ field.label }}</label>
                        <input v-if="field.type === 'text' || field.type === 'number'" :id="field.name" :type="field.type"
                            v-model="formData[field.name]" :required="field.required" />
                        <input v-else-if="field.type === 'file'" :id="field.name" type="file" @change="onFileChange" />
                        <textarea v-else-if="field.type === 'textarea'" :id="field.name"
                            v-model="formData[field.name]"></textarea>
                        <select v-else-if="field.type === 'select'" :id="field.name" v-model="formData.active">
                            <option :value="true">Aktywny</option>
                            <option :value="false">Nieaktywny</option>
                        </select>
                    </div>
                </form>

                <p v-else>
                    Czy na pewno usunąć {{ currentRow.title }}?
                </p>
            </template>

            <template #footer>
                <button v-if="currentAction !== 'delete'" @click="handleSubmit">
                    {{ currentAction === 'edit' ? 'Zapisz' : 'Utwórz' }}
                </button>
                <button v-else @click="deleteFoodSet">Usuń</button>
                <button @click="closeModal">Anuluj</button>
            </template>
        </AdminModal>
    </div>
</template>

<script>
import AdminModal from "@/components/ui/Modal.vue";
import Card from "@/components/ui/CardComponent.vue";
import {
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
} from "@/services/packageServices";

export default {
    name: "FoodSet",
    components: {
        AdminModal,
        Card,
    },
    data() {
        return {
            fields: [
                { name: "title", label: "Tytuł", type: "text", required: true },
                { name: "image", label: "Zdjęcie", type: "file", required: false },
                { name: "price", label: "Cena", type: "number", required: true },
                { name: "description", label: "Opis", type: "textarea", required: true },
                { name: "active", label: "Status na stronie", type: "select", required: true },
            ],
            packages: [],
            showModal: false,
            currentAction: "",
            currentRow: null,
            selectedFile: null,
            formData: this.getEmptyFormData(),
        };
    },
    async created() {
        await this.loadPackages();
    },
    computed: {
        modalTitle() {
            const titles = {
                add: "Tworzenie nowego Zestawa",
                edit: "Edytowanie Zestawa",
                delete: "Usunąć Zestawa",
            };
            return titles[this.currentAction] || "";
        },
    },
    methods: {
        async loadPackages() {
            try {
                this.packages = await getPackages();
            } catch (e) {
                console.error("Failed to load packages:", e);
            }
        },
        getEmptyFormData() {
            return {
                title: "",
                image: "",
                price: "",
                description: "",
                active: true,
            };
        },
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.formData.image = this.selectedFile;
        },
        openModal(action, row = null) {
            this.currentAction = action;
            this.currentRow = row ? { ...row } : null;

            if (action === "edit" && row) {
                this.formData = { ...row };
            } else {
                this.formData = this.getEmptyFormData();
            }

            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.currentAction = "";
            this.currentRow = null;
            this.formData = this.getEmptyFormData();
        },
        async handleSubmit() {
            try {
                if (this.currentAction === "edit") {
                    await updatePackage(this.currentRow._id, this.formData);
                } else {
                    await createPackage(this.formData);
                }
                await this.loadPackages();
                this.closeModal();
            } catch (e) {
                console.error("Ошибка при сохранении пакета:", e);
            }
        },
        async deleteFoodSet() {
            try {
                await deletePackage(this.currentRow._id, this.currentRow.image);
                await this.loadPackages();
                this.closeModal();
            } catch (e) {
                console.error("Ошибка при удалении пакета:", e);
            }
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
    flex-direction: column;
    gap: 8px;
}

.form-group {
    margin-bottom: 15px;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
}

.buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.btn,
.mini-btn {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: var(--background-color);
    font-weight: bold;
}

.btn:hover,
.mini-btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    transition: background-color 0.2s ease;
}

a {
    color: blue;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>