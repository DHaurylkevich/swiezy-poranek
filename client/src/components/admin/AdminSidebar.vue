<template>
    <nav class="admin-sidebar">
        <div class="container">
            <div class="logo">
                <p>Swiezy Poranek</p>
            </div>
            <div class="nav-links">
                <router-link to="/admin/dashboard">Dashboard</router-link>
                <router-link to="/admin/foodset">FoodSet</router-link>
                <router-link to="/admin/orders">Orders</router-link>
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
        }
    }
};
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
    gap: 5vh;
}

.logo {
    color: #FCB825;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
}

.nav-links a {
    flex: 1;
    display: block;
    padding: 15px 0;
    color: #333;
    text-decoration: none;
}

.nav-links a:hover {
    background-color: #e9ecef;
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
}</style>