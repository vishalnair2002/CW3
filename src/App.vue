<template>
  <div id="app">
    <header>
      <h1>{{ sitename }}</h1>
      <button @click="toggleCheckout" :disabled="cart.length === 0">Checkout ({{ cart.length }})</button>
    </header>
    <main>
      <ProductList @addproduct="addToCart"></ProductList>
      <FormComponent ref="formComponent" v-if="showCheckout" :cart="cart" @removeitem="removeItem" @submitform="submitOrder"></FormComponent>

      <!-- Notification -->
      <div v-if="Message" class="Message">
        {{ Message }}
      </div>
    </main>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import FormComponent from "./components/Form.vue";

export default {
  name: "App",
  components: {
    ProductList,
    FormComponent,
  },
  data() {
    return {
      sitename: "After School Club & Activities",
      cart: [],
      showCheckout: false, // Add a boolean data property to manage checkout visibility
      Message: "",
      MessageTimer: null, // Add a timer property to track the toast duration
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      // Check if cart is empty after removal
      if (this.cart.length === 0) {
        this.showCheckout = false; // Hide checkout when cart is empty
      }
    },
    toggleCheckout() {
      this.showCheckout = !this.showCheckout; // Toggle checkout visibility
    },
    submitOrder(formData) {
      // Process the submitted order data (e.g., send to server, update database)
      console.log("Order Submitted:", formData);
      // Assuming a successful order submission

      // Show toast message
      this.Message = "Order submitted successfully!";
      
      // Clear the cart and reset checkout state
      this.cart = [];
      this.showCheckout = false;
      this.$refs.formComponent.clearForm(); // Call method in child component to clear form fields

      // Set timer to clear the message after 10 seconds
      this.MessageTimer = setTimeout(() => {
        this.Message = "";
      }, 5000); // 5 seconds in milliseconds
    },
    resetOrder() {
      // Existing resetOrder logic...
      this.orderSubmitted = false; // Reset orderSubmitted when resetting the order
    },
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

header {
    text-align: center;
    color: rgb(7, 11, 220);
}

#app {
  max-width: 800px;
  margin: 20px auto;
}

main {
  padding: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.Message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border-radius: 5px;
}

</style>