<template>
    <transition name="fade">
        <div class="card">
            <div class="card-img">
                <img v-if="image" :src=image :alt="title" class="package-image" />
            </div>
            <div class="card-body">
                <h3 class="package-title">{{ title }}</h3>
                <p v-if="this.price" class="package-price">{{ formattedPrice }}</p>
                <div class="description">
                    <p>{{ description }}</p>
                </div>
            </div>
            <router-link to="/order/zestawy" class="btn">Zamawiam</router-link>
        </div>
    </transition>
</template>

<script>
export default {
    name: "CardComponent",
    props: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 264px;
    padding: 26px;
    border-radius: 20px;
}

.card-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    border-radius: 15px;
}

.card-img img {
    max-width: 100%;
    /* width: 200px; */
    height: auto;
    object-fit: cover;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 50px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.btn:hover a {
    color: var(--primary-color);
}

@media (max-width: 425px) {}
</style>
