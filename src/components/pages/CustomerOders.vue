<template>
  <div>
    <!-- <div class="dropdown">
      <CartDropdown/>
    </div>-->
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end jumbotron-img">
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
              <span class="font-weight-bold p-2">產品分類</span>
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
                <CustomerOrdersCard :item="item" v-on:addtoCart="addtoCart" :status="status"/>
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

    <!-- 選購區 -->

    <!-- 購物車 -->

    <!-- 購物車 -->

    <!-- 消費者資訊 -->
    <!-- <div class="my-1 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            v-validate="'required|email'"
            :class="{'is-invalid':errors.has('email')}"
            placeholder="請輸入 Email"
          >
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            name="tel"
            :class="{'is-invalid':errors.has('tel')}"
            v-model="form.user.tel"
            v-validate="'required'"
            placeholder="請輸入電話"
          >
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            :class="{'is-invalid':errors.has('address')}"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          >
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>-->
    <!-- 消費者收件資訊 -->

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
import Pagination from "@/components/pages/Pagination.vue";
// import CartDropdown from "@/components/pages/CartDropdown.vue";
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
      // form: {
      //   user: {
      //     name: "",
      //     email: "",
      //     tel: "",
      //     address: ""
      //   },
      //   message: ""
      // },
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
    // CartDropdown,
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
      this.$http.get(api).then(response => {
        this.allProducts = response.data.products;
      });
    },
    getProduct(id) {
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(url).then(response => {
        console.log(response.data);
        vm.status.loadingItem = "";
        vm.product = response.data.product;
        $("#productModal").modal("show");
      });
    },
    addtoCart(id, qty = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response.data);
        // this.$bus.$emit("DropMenu:getCartList");
        this.$bus.$emit("cart:update");
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.status.loadingItem = "";
        vm.cart = response.data.data;
        console.log(vm.cart.carts);
      });
    },
    removeCartItem(id) {
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(url).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    createOrder() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(url, { data: order }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            } else {
              vm.$bus.$emit("message:push", response.data.message, "danger");
            }

            vm.isLoading = false;
          });
        } else {
          vm.$bus.$emit("message:push", "欄位不完整", "danger");
          console.log("欄位不完整");
        }
      });
    }
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
    this.getCart();
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