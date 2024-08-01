<template>
    <header>
        <nav class="container">
            <div class="logo">
                <img class="img" src="../assets/logo.svg" alt="Logo"/>
            </div>
            <ul class="links">
                <li :class="{ 'active': isRouteActive('/') }">
                    <router-link to="/">Home</router-link>
                </li>
                <li :class="{ 'active': isRouteActive('/zestawy') }">
                    <router-link to="/zestawy">Zestawy</router-link>
                </li>
                <li :class="{ 'active': isRouteActive('/order') }">
                    <router-link to="/order">Blog</router-link>
                </li>
            </ul>
            <button class="btn">
                <router-link to="/order">Zamów</router-link>
            </button>
        </nav>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    methods: {
        isRouteActive(path) {
            return this.$route.path.startsWith(path);
        }
    }
}
</script>
<style scoped>
header {
    position:fixed;
    z-index: 3;
    width: 100%;
    background-color: var(--background-color);
    /* box-shadow: 0 19px 40px rgba(0, 0, 0, 0.1); */
}

.container {
    padding: 16px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    width: var(--width-btn);
    height: var(--hight-btn);
}
.logo .img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;  
}
.logo .text {
    font-size: var(--font-size-medium);
    font-weight: bold;
    margin-left: 10px;
}

.links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    gap: 20px;
    font-size: var(--font-size-base);
    border: 2px solid var(--primary-color);
    border-radius: 40px;
    width: 448px;
    height: 40px;
}
.links li {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    width: 112px;
    height: 40px;
}
.links .active {
    background-color: var(--primary-color);
    font-weight: bold;
    border-radius: 40px;
}
.links li:hover {
    background-color: var(--primary-color);
    transition: background-color 0.3s ease;
    font-weight: bold;
    border-radius: 40px;
}

.btn {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}
.btn a {
    color: var(--primary-color);
}
.btn:hover {
    background-color: var(--primary-color);
}
.btn:hover a {
    color: #FFF;
}
</style>
