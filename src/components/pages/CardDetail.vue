<template>
  <div class="container">
    <div class="row no-gutters" v-if="product.id">
      <div class="col-md-8">
        <div class="prodImg">
          <img :src="product.imageUrl" alt>
        </div>
      </div>
      <div class="col-md-4">
        <div class="prodInfo addCartblock">
          <h2>{{product.title}}</h2>
          <div class="prodPrice">
            <del>原價 {{product.origin_price | currency}}</del>
            <h4>特價 {{product.price | currency}}</h4>
          </div>
          <select class="form-control mb-3" v-model="product.buyNum">
            <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
          </select>
          <p
            class="text-right text-main font-weight-bold mb-1"
          >小計 {{product.buyNum * product.price | currency}}</p>
          <button
            type="button"
            class="addTocardBtn"
            @click="addtoCart(product.id,product.buyNum)"
            :disabled="status.loadingIcon"
          >
            <i class="fas fa-spinner fa-spin mr-1" v-if="status.loadingIcon"></i>放入購物車
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8" v-if="product.id">
        <div class="prodInfo">
          <h3>產品描述</h3>
          <p>
            {{ product.description }}
            <em class="blockquote-footer text-right">{{ product.content }}</em>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productID: "",
      product: {},
      status: {
        loadingIcon: false
      },
      isLoading: false
    };
  },
  methods: {
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        vm.$set(vm.product, "buyNum", 1);
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.loadingIcon = true;
      vm.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
        }
        vm.status.loadingIcon = false;
      });
    }
  },
  created() {
    const vm = this;
    vm.productID = vm.$route.params.prodId;
    vm.getProduct(vm.productID);
  },
  watch: {
    "$route.params.prodId": function() {
      const vm = this;
      vm.productID = vm.$route.params.prodId;
      vm.getProduct(vm.productID);
    }
  }
};
</script>