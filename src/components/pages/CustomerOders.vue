<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end jumbotron-img mt-5">
      <div class="container">
        <div class="p-3 bg-lighter"></div>
      </div>
    </div>
    <!-- 選購區 -->
    <div class="container">
      <div class="row mt-4">
        <div class="col-lg-3 col-md-4">
          <div class="sticky-top" style="top:56px">
            <div class="list-group list-group-flush">
              <a
                class="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#"
                @click.prevent="currentPage ='全部',status.filter=false"
              >全部</a>
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#"
                @click.prevent="currentPage ='鞋子',status.filter=true "
              >鞋子</a>
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#"
                @click.prevent="currentPage ='褲子',status.filter=true"
              >褲子</a>
              <a
                href="#"
                class="list-group-item list-group-item-action"
                data-toggle="list"
                @click.prevent="currentPage ='甜點',status.filter=true"
              >甜點</a>
              <a
                href="#"
                class="list-group-item list-group-item-action"
                data-toggle="list"
                @click.prevent="currentPage ='麵包',status.filter=true"
              >麵包</a>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="row">
            <template v-for="(item,key) in filterProducts">
              <div div class="col-lg-4 col-md-6 mb-4" :key="key">
                <!-- <CustomerOrdersCard :item="item" v-on:addtoCart="addtoCart" :status="status"/> -->
                <CustomerOrdersCard :item="item" :status="status"/>
              </div>
            </template>
          </div>
          <!-- 分頁 -->
          <Pagination
            class="d-flex mx-auto"
            :pagination="pagination"
            v-on:getPageProducts="getProducts"
          />
          <!-- 分頁 -->
        </div>
      </div>
      <!-- 選購區 -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/pages/Pagination.vue";
import CustomerOrdersCard from "@/components/pages/CustomerOrdersCard.vue";

export default {
  data() {
    return {
      allProducts: [],
      products: [],
      currentPage: "全部",
      product: {},
      pagination: {},
      cart: {},
      status: {
        loadingItem: "",
        filter: false
      },
      coupon_code: "",
      isLoading: false
    };
  },
  components: {
    Pagination,
    CustomerOrdersCard
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getAllProducts() {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        this.allProducts = response.data.products;
        vm.isLoading = false;
      });
    }
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
    // addtoCart(id, qty = 1) {
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   const vm = this;
    //   vm.status.loadingItem = id;
    //   const cart = {
    //     product_id: id,
    //     qty
    //   };
    //   vm.isLoading = true;
    //   this.$http.post(url, { data: cart }).then(response => {
    //     console.log(response.data);
    //     vm.isLoading = false;
    //     this.$bus.$emit("cart:update");
    //     vm.getCart();
    //     $("#productModal").modal("hide");
    //   });
    // },
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
    // }
  },
  computed: {
    filterProducts() {
      var vm = this;
      if (vm.currentPage == "全部") {
        return this.products;
      } else {
        return this.allProducts.filter(function(item, index) {
          if (item.category == vm.currentPage) return true;
        });
      }
    }
  },
  created() {
    this.getProducts();
    this.getAllProducts();
    // this.getCart();
  }
};
</script>

<style scoped>
.jumbotron-img {
  background-image: url("../../../image/david-lezcano-225889-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  height: 250px;
}
</style>