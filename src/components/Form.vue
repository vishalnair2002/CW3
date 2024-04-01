<template>
  <div>
    <h2>Checkout</h2>
    <h3>Added products</h3>
    <div v-for="(product, index) in cart" :key="product.id">
      {{ product.title }} - AED {{ product.price }}
      <button @click="removeItem(index)">Remove</button>
    </div>
    <div>
      <strong>Name:</strong>
      <input v-model.trim="name" placeholder="Enter your name" />
      <strong>Address:</strong>
      <input v-model.trim="address" placeholder="Enter your address" />
      <button @click="submitForm" :disabled="cart.length === 0 || !canSubmit">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  props: ['cart'],
  data() {
    return {
      name: "",
      address: "",
    };
  },
  computed: {
    canSubmit() {
      return this.name.trim() !== "" && this.address.trim() !== "";
    },
  },
  methods: {
    removeItem(index) {
      this.$emit("removeitem", index);
    },
    submitForm() {
      if (this.canSubmit) {
        const formData = {
          name: this.name,
          address: this.address,
          cartItems: this.cart,
        };
        this.$emit("submitform", formData);
        this.name = ""; // Clear input fields after submission
        this.address = "";
      }
    },
    clearForm() {
      this.name = "";
      this.address = "";
    },
  },
};
</script>

<style scoped>
h2, h3 {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  border: none;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input {
  margin-right: 10px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>