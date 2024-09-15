<template>
    <div class="admin-layout">
        <AdminSidebar />
        <div class="admin-content">
            <router-view />
        </div>
    </div>
</template>

<script>
import AdminSidebar from "../views/admin/AdminSidebar.vue";

export default {
    name: "AdminLayout",
    components: {
        AdminSidebar
    }
};
</script>

<style scoped>
.admin-layout {
    display: flex;
    height: 100vh;
}

.admin-content {
    flex: 1;
    padding: 20px;
}
</style>
