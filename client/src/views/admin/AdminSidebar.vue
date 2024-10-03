<template>
    <nav class="admin-sidebar">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    Swiezy Poranek
                </router-link>
            </div>
            <div class="nav-links">
                <router-link to="/admin/zestawy"
                    :class="{ 'active': isRouteActive('/admin/zestawy') }">Zestawy</router-link>
                <router-link to="/admin/menu" :class="{ 'active': isRouteActive('/admin/menu') }">Menu</router-link>
                <router-link to="/admin/orders"
                    :class="{ 'active': isRouteActive('/admin/orders') }">Zamówienia</router-link>
                <router-link to="/admin/contacts"
                    :class="{ 'active': isRouteActive('/admin/contacts') }">Contacts</router-link>
                <router-link to="/admin/gallery"
                    :class="{ 'active': isRouteActive('/admin/gallery') }">Gallery</router-link>
            </div>
        </div>
        <div class="logout">
            <button @click="logout">Exit</button>
        </div>
    </nav>
</template>

<script>
import { logoutAdmin } from "@/services/adminServices"
export default {
    name: "AdminSidebar",
    methods: {
        async logout() {
            try {
                if (await logoutAdmin()) {
                    this.$router.push("/");
                }
            } catch (err) {
                console.log("ERROR")
            }
        },
        isRouteActive(path) {
            return this.$route.path.startsWith(path);
        }
    }
}
</script>

<style scoped>
.admin-sidebar {
    width: 250px;
    background-color: #f8f9fa;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
}

.container {
    display: grid;
    flex-direction: column;
    gap: 5vh;
}

.logo {
    color: #FCB825;
    font-size: 28px;
    font-weight: 900;
    text-align: center;
    margin-top: 20px;
}

.nav-links {
    display: flex;
    flex-direction: column;
}

.nav-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 20px;
    padding: 15px 0;
    color: #333;
    text-decoration: none;
    text-align: center;
}

.nav-links a.active {
    background-color: #e9ecef;
    font-weight: bold;
    border-radius: 5px;
}

.nav-links a:hover {
    background-color: #e9ecef;
    border-radius: 5px;
}

.logout {
    margin-top: 20px;
}

.logout button {
    width: 100%;
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
}

.logout button:hover {
    background-color: #c82333;
}
</style>