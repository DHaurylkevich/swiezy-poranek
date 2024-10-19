<template>
    <header>
        <nav class="container">
            <div class="logo">
                <router-link to="/"><img src="@/assets/logo.svg" alt="Logo Świeży Poranek Catering w Poznaniu" /></router-link>
            </div>
            <ul class="links">
                <li :class="{ 'active': currentSection === 'home' }">
                    <router-link :to="{ name: 'Home', hash: '#home' }" v-scroll-to="'#home'">
                        <button class="mini-btn">Home</button>
                    </router-link>
                </li>
                <li :class="{ 'active': currentSection === 'zestawy' }">
                    <router-link :to="{ name: 'Home', hash: '#zestawy' }" v-scroll-to="'#zestawy'">
                        <button class="mini-btn">Menu</button>
                    </router-link>
                </li>
                <li :class="{ 'active': currentSection === 'gallery' }">
                    <router-link :to="{ name: 'Home', hash: '#gallery' }" v-scroll-to="'#gallery'">
                        <button class="mini-btn">Gallery</button>
                    </router-link>
                </li>
            </ul>
            <router-link class="btn" to="/order/zestawy">Zamów</router-link>
        </nav>
    </header>
</template>

<script>

export default {
    name: "HeaderComponent",
    computed: {
        currentSection() {
            return this.$store.getters.currentSection;
        }
    }
};
</script>

<style scoped>
header {
    position: fixed;
    z-index: 3;
    width: 100%;
    background-color: var(--background-color);
}

.container {
    padding: 24px var(--spacing-inline);
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

.logo img {
    max-width: 100%;
    height: auto;
}

.links {
    display: flex;
    justify-content: space-between;
    list-style: none;
    border: 2px solid var(--primary-color);
    border-radius: 40px;
    height: 40px;
    align-items: center;
    font-size: var(--font-size-base);
}

.links li {
    display: flex;
    align-items: center;
    justify-content: center;
}

.mini-btn {
    background-color: var(--primer-color);
    border: none;
}

.mini-btn:hover {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
    border-radius: 40px;
    transition: background-color 0.3s ease;
}

.active .mini-btn {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
    border-radius: 40px;
}

.btn {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-weight: bold;
}

.btn:hover {
    background-color: var(--primary-color);
    color: #fff;
}

@media (max-width: 576px) {
    .container {
        padding: 16px var(--spacing-inline);
    }

    .links {
        display: none;
    }
}

@media (min-width: 577px) and (max-width: 768px) {
    .container {
        padding: 16px var(--spacing-inline);
    }

    .links {
        width: 288px;
        height: 32px;
        gap: 8px;
    }

    .logo img,
    .btn {
        width: 90px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .links {
        width: 400px;
    }
}
</style>
