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
      <div class="card-footer d-flex">
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
    </div>
    <!-- 詳細商品內容 -->
    <!-- <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <img :src="product.imageUrl" class="img-fluid">
            </div>

            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquote-footer text-right">{{product.description}}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{product.origin_price}}元</div>
              <del class="h6" v-if="product.price">原價{{product.origin_price}}元</del>
              <div class="h4" v-if="product.price">現在只要{{product.price}}元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong v-if="!product.num">0</strong>元
              <strong v-if="product.num">{{product.num*product.price}}</strong>元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id,product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 詳細商品內容 -->
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