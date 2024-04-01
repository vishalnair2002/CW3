<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <h2>{{ product.title }}</h2>
      <figure>
        <img :src="getImageUrl(product.image)" :alt="product.title" />
      </figure>
      <p v-html="product.description"></p>
      <p>Price: AED {{ product.price }}</p>
      <p v-if="product.availableInventory > 0 && product.availableInventory <= 5">
        Available stock: {{ product.availableInventory }}
      </p>
      <p v-else-if="product.availableInventory > 5">
        Available stock: Limited stock
      </p>
      <p v-else style="color: red;">Out of stock</p>
      <p><strong>Location:</strong> {{ product.location }}</p> <!-- Location below price -->
      <button @click="addToCart(product)" :disabled="product.availableInventory <= 0">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [
        {
          rating: 3,
          id: 1001,
          title: "Math",
          room: "Classroom A",
          location: "Jumeirah",
          price: 100,
          image: "Math.jpg",
          availableInventory: 5,
        },
        {
        rating: 3,
        id: 1002,
        title: "Science",
        room: "Lab B",
        location: "Al Qouz",
        price: 120,
        image: "Science.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1003,
        title: "English",
        room: "Room C",
        location: "JVC",
        price: 140,
        image: "English.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1004,
        title: "Music",
        room: "Music Room",
        location: "Marina",
        price: 125,
        image: "Music.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1005,
        title: "Football",
        location: "AL Wasl",
        price: 160,
        image: "Football.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1006,
        title: "Cricket",
        location: "Al Nasr",
        price: 160,
        image: "Cricket.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1007,
        title: "Chess",
        room: "Chess Club Room",
        location: "Greens",
        price: 145,
        image: "Chess.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1008,
        title: "Photography",
        room: "Art Studio",
        location: "Karama",
        price: 150,
        image: "Photography.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1009,
        title: "Arts",
        room: "Art Room",
        location: "Silicon",
        price: 110,
        image: "Arts.jpg",
        availableInventory: 5,
    },
    {
        rating: 3,
        id: 1010,
        title: "Yoga",
        room: "Yoga Studio",
        location: "Falcon",
        price: 130,
        image: "Yoga.jpg",
        availableInventory: 5,
    },
      ],
    };
  },
  methods: {
    addToCart(product) {
      // Add to cart logic here
      this.$emit('addproduct', product);
    },
    getImageUrl(imageName) {
      // Logic to get the image URL from the 'public' folder
      return process.env.BASE_URL + imageName; // Assuming the images are in the 'public' folder
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 5px solid #050505;
  padding: 15px;
  margin: 10px;
  text-align: center;
  max-width: 190px;
  background-color: #fff;
  border-radius: 10px;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-card button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
