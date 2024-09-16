<template>
    <div class="contact-edit">
        <h1>Редактирование Галереи</h1>
        <form @submit.prevent="uploadImage" class="form">
            <div class="form-group">
                <label for="image">Фото</label>
                <input type="file" id="image" @change="onFileChange" />
            </div>
            <div class="form-group">
                <label for="title">Заголовок</label>
                <input type="text" id="title" v-model="formData.title" placeholder="Введите заголовок" />
            </div>
            <button type="submit" class="submit-button">Сохранить</button>
        </form>

        <div v-if="images.length" class="gallery">
            <h2>Загруженные изображения:</h2>
            <ul class="gallery-list">
                <li v-for="(image, index) in images" :key="index" class="gallery-item">
                    <img :src="image.url" :alt="image.title" class="gallery-image" />
                    <div class="gallery-item-info">
                        <p>{{ image.title }}</p>
                        <button @click="handleDeleteImage(image._id)" class="delete-button">Удалить</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import { saveImage, getImages, deleteImage } from '@/services/imageServices';

export default {
    data() {
        return {
            formData: this.getEmptyFormData(),
            images: [],
            selectedFile: null,
        };
    },
    async created() {
        this.loadImages();
    },
    methods: {
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.formData.image = this.selectedFile;
        },
        getEmptyFormData() {
            return {
                title: "",
                image: null,
            };
        },
        async loadImages() {
            try {
                const response = await getImages();
                this.images = response;
                console.log(this.images)
            } catch (error) {
                console.error("loadImages:", error);
            }
        },
        async uploadImage() {
            try {
                console.log(this.formData);
                await saveImage(this.formData);
                await this.loadImages();
            } catch (e) {
                console.error("uploadImage:", e);
            }
        },
        async handleDeleteImage(id) {
            try {
                await deleteImage(id);
                await this.loadImages();
            } catch (e) {
                console.error("handleDeleteImage:", e);
            }
        }
    },
};

</script>

<style scoped>
.contact-edit {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 16px;
    color: #333;
}

input[type="text"],
input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #fff;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="file"]:focus {
    border-color: #007bff;
    outline: none;
}

.submit-button {
    padding: 12px 24px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #c82333;
}

/* Стили галереи */
.gallery {
    margin-top: 30px;
}

.gallery-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2vw;
    padding: 0;
    list-style: none;
}

.gallery-item {
    width: 100%;
    max-width: 200px;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gallery-image {
    width: 100%;
    height: auto;
}

.gallery-item-info {
    padding: 10px;
}

.gallery-item-info p {
    margin: 0;
    font-weight: 500;
    color: #333;
    font-size: 14px;
}
</style>
