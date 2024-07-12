<template>
    <div>
        <h1>Zestawy</h1>
        <div v-if="zestawy">
            <div v-for="zestaw in zestawy" :key="zestaw._id">
                <h2>{{ zestaw.name }}</h2>
                <p>{{ zestaw.description }}</p>
                <p>{{ zestaw.price }} PLN</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            zestawy: null
        };
    },
    async created() {
        const response = await axios.get('http://localhost:5000/zestawy');
        this.zestawy = response.data;
    }
};
</script>
  