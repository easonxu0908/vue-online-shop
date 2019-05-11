<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="card border-0 rounded shadow-sm">
      <div
        class="card-img-top"
        style="height: 300px; background-size: cover; background-repeat: no-repeat; background-position: center"
        :style="{backgroundImage:`url(${item.imageUrl})`}"
      ></div>
      <div class="card-body">
        <span class="badge badge-primary float-right ml-2">{{item.category}}</span>
        <h5 class="card-title">
          <a href="#" class="text-dark">{{item.title}}</a>
        </h5>
        <p class="card-text">{{item.content}}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
          <del class="h6" v-if="item.origin_price">原價{{item.origin_price}}</del>
          <div class="h5" v-if="item.price">現在只要{{item.price}}</div>
        </div>
      </div>
      <div class="card-footer d-flex" v-if="item.is_enable">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          @click=" prodctInfo(item.id)"
        >查看更多</button>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm ml-auto"
          @click="addtoCart(item.id)"
        >加到購物車</button>
      </div>
      <div class="card-footer d-flex" v-else>
        <button type="button" class="btn btn-outline-secondary disabled ml-auto mr-auto w-100">敬請期待</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  // props: ["item", "status"],
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    status: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isLoading: false
      // product: {}
    };
  },
  methods: {
    addtoCart(id, qty = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      // vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      vm.isLoading = true;
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        this.$bus.$emit("cart:update");
        $("#productModal").modal("hide");
      });
    },
    // getCart() {
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   const vm = this;
    //   vm.isLoading = true;
    //   this.$http.get(url).then(response => {
    //     console.log(response);
    //     vm.isLoading = false;
    //     vm.status.loadingItem = "";
    //     vm.cart = response.data.data;
    //     console.log(vm.cart.carts);
    //   });
    // },
    // getProduct(id) {
    //   const url = `${process.env.APIPATH}/api/${
    //     process.env.CUSTOMPATH
    //   }/product/${id}`;
    //   const vm = this;
    //   vm.status.loadingItem = id;
    //   this.$http.get(url).then(response => {
    //     console.log(response.data);
    //     vm.status.loadingItem = "";
    //     vm.product = response.data.product;
    //     $("#productModal").modal("show");
    //   });
    // },
    prodctInfo(id) {
      const vm = this;
      console.log(id);
      vm.$router.push(`/cardDetail/${id}`);
    }
  }
};
</script>