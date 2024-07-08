<template>
  <div>
    <h1>Order Page</h1>
    <form @submit.prevent="placeOrder">
      <div>
        <label for="clientName">Name:</label>
        <input type="text" id="clientName" v-model="order.clientName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="order.email" required>
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="order.phone" required>
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="order.address" required>
      </div>
      <div>
        <label for="items">Items:</label>
        <textarea id="items" v-model="order.items" required></textarea>
      </div>
      <div>
        <label for="totalPrice">Total Price:</label>
        <input type="number" id="totalPrice" v-model="order.totalPrice" required>
      </div>
      <button type="submit">Place Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        clientName: '',
        email: '',
        phone: '',
        address: '',
        items: '',
        totalPrice: 0
      }
    };
  },
  methods: {
    async placeOrder() {
      try {
        const response = await fetch('http://localhost:5000/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.order)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Order placed successfully');
        } else {
          alert('Error placing order: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error placing order');
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
form div {
  margin-bottom: 10px;
}
</style>