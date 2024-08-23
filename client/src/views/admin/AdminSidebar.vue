<template>
    <nav class="admin-sidebar">
        <div class="container">
            <div class="logo">
                <p>Swiezy Poranek</p>
            </div>
            <div class="nav-links">
                <router-link to="/admin/AdminFoodSet"
                :class="{'active': isRouteActive('/admin/AdminFoodSets') }"
                >FoodSet</router-link>
                <router-link to="/admin/AdminOrders"
                :class="{'active': isRouteActive('/admin/AdminOrders') }"
                >Orders</router-link>
            </div>
        </div>
        <div class="logout">
            <router-link to="/">
                <button @click="logout">Exit</button>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AdminSidebar",
    methods: {
        logout() {
            // Логика выхода
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