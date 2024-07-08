<template>
    <div class="home">
        <h1> Welcome to Swiezy Poranek</h1>
        <router-link to="/orders">View Orders</router-link>
        <router-link to="/create-order">Create Order</router-link>
    </div>
</template>

<script>
export default {
    name: "HomePage"
};
</script>