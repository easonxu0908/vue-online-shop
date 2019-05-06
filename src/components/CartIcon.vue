<template>
  <div>
    <i class="fas fa-shopping-cart text-dark fa-2x">
      <!-- <div class="cart-quantity bg-danger text-white" v-if="cartLen>0">{{ cartLen }}</div> -->
    </i>
    <span class="badge badge-pill badge-danger">{{ cartLen }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartLen: 0
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.cart = response.data.data;
        vm.cartLen = response.data.data.carts.length;
      });
    }
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on("cart:update", vm.getCart);
  }
};
</script>

<style scoped>
.badge-pill {
  position: fixed;
  top: 5px;
  right: 30px;
  z-index: 1000;
}
</style>