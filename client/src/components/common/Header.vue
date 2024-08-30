<template>
    <header>
        <nav class="container">
            <div class="logo">
                <router-link to="/"><img src="@/assets/logo.svg" alt="Logo" /></router-link>
            </div>
            <ul class="links">
                <li :class="{ 'active': currentSection === 'home' }">
                    <button class="mini-btn" @click="scrollToSection('#home')">Home</button>
                </li>
                <li :class="{ 'active': currentSection === 'zestaw' }">
                    <button class="mini-btn" @click="scrollToSection('#zestawy')">Menu</button>
                </li>
                <li :class="{ 'active': currentSection === 'gallery-section' }">
                    <button class="mini-btn" @click="scrollToSection('#gallery')">Gallery</button>
                </li>
            </ul>
            <router-link class="btn" to="/order/zestawy">Zamów</router-link>
        </nav>
    </header>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

export default {
    name: "HeaderComponent",
    data() {
        return {
            currentSection: ''
        };
    },
    methods: {
        scrollToSection(sectionId) {
            VueScrollTo.scrollTo(sectionId, 500);
        },
        handleScroll(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                }
            });
        }
    },
    mounted() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        this.observer = new IntersectionObserver(this.handleScroll, options);

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            this.observer.observe(section);
        });
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
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

.logo a {
    /* width: var(--width-btn);
    height: var(--hight-btn); */
}

img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
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
    /* width: 112px;
    height: 40px; */
}

.mini-btn {
    background-color: var(--primer-color);
    border: none;
}

.active .mini-btn {
    background-color: var(--primary-color);
    font-weight: bold;
    border-radius: 40px;
}

.mini-btn:hover {
    background-color: var(--primary-color);
    transition: background-color 0.3s ease;
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
}

.btn:hover {
    color: #FFF;
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

    .logo, .btn {
        width: 90px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .links {
        width: 400px;
    }

    .logo img{
        height: auto;
    }
}</style>
