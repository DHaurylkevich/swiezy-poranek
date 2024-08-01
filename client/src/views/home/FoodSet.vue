<template>
    <section class="food-set">
        <div class="title">
            <div class="icon">
                <img src="@/assets/img/foodset/sun.svg">
            </div>
            <div class="text">
                <p>Zestawy</p>
            </div>
        </div>
        <div class="carousel">
            <div class="cards-container">
                <p> - </p>
                <dic class="card">
                    <div class="card-img">
                        <img src="@/assets/img/foodset/vege.png" alt="Meal Image">
                    </div>
                    <p class="text">Wego</p>
                    <div class="description">
                        <p>Symphony of garlic-infused, creating a delightful masterpiece captivates senses.</p>
                    </div>
                    <button class="btn">
                        <router-link to="/order">Zamawiam</router-link>
                    </button>
                </dic>
                <dic class="card">
                    <div class="card-img">
                        <img src="@/assets/img/foodset/vege.png" alt="Meal Image">
                    </div>
                    <p class="text">Classic</p>
                    <div class="description">
                        <p>Symphony of garlic-infused, creating a delightful masterpiece captivates senses.</p>
                    </div>
                    <button class="btn">
                        <router-link to="/order">Zamawiam</router-link>
                    </button>
                </dic>
                <dic class="card">
                    <div class="card-img">
                        <img src="@/assets/img/foodset/vege.png" alt="Meal Image">
                    </div>
                    <p class="text">Classic</p>
                    <div class="description">
                        <p>Symphony of garlic-infused, creating a delightful masterpiece captivates senses.</p>
                    </div>
                    <button class="btn">
                        <router-link to="/order">Zamawiam</router-link>
                    </button>
                </dic>
                <p> - </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "FoodSetSection"
}
</script>

<style scoped>
.food-set {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-section);
    background-color: var(--background-color);
    padding-top: 16px;
    padding-bottom: 100px;
}
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title .icon {
    display: flex;
    align-items: center;
}

.icon img {
    max-width: 100%;
    height: auto;
}

.title .text {
    font-size: var(--font-size-large);
    font-weight: bold;
}

.carousel {
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.cards-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 264px;
    height: auto;
    /* padding: 20px; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    background-color: white;
    border-radius: 20px;
}

.card .card-img {
    display: flex;
    align-items: center;
}

.card-img img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.card .text {
    font-size: var(--font-size-medium);
    font-weight: bold;
}

.card .description {
    margin: 8px 0;
    font-size: var(--font-size-base);
    color: #333;
}

.btn {
    background-color: var(--primary-color);
    color: var(--background-color);
    border: none;
}

.btn a {
    color: var(--background-color);
}

.btn:hover {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
}

.btn:hover a {
    color: var(--primary-color);
}
</style>