<template>
  <div>
    <div class="dropdown">
      <CartDropdown/>
    </div>
    <loading :active.sync="isLoading"></loading>
    <!-- 選購區 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: contain; background-repeat: no-repeat; background-position: center"
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
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 選購區 -->

    <!-- 分頁 -->
    <Pagination class="ml-auto" :pagination="pagination" v-on:getPageProducts="getProducts"/>

    <!-- 分頁 -->
    <!-- 選購區 -->

    <!-- 購物車 -->
    <!-- <div class="container">
      <div class="row justify-content-center mt-4">
        <div class="col-md-6">
          <div class="h4 text-center mb-4">
            <span>購物車</span>
          </div>
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>
      </div>
    </div>-->
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
    <div
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
    </div>
    <!-- 詳細商品內容 -->
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/pages/Pagination.vue";
import CartDropdown from "@/components/pages/CartDropdown.vue";

export default {
  data() {
    return {
      products: [],
      product: {},
      pagination: {},
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      status: {
        loadingItem: ""
      },

      coupon_code: "",
      isLoading: false
    };
  },
  components: {
    Pagination,
    CartDropdown
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
        this.$bus.$emit("DropMenu:getCartList");
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
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>