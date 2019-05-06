<template>
  <div>
    <div class="cart">
      <div class="container-fluid" v-if="cart.total!=0">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-7">
            <div
              class="item d-flex align-items-center mb-2 row"
              v-for="item in cart.carts"
              :key="item.id"
            >
              <div
                class="item-image ml-3 ml-sm-auto"
                :style="{'backgroundImage': `url(${item.product.imageUrl})`}"
              ></div>
              <div class="item-title ml-2">{{ item.product.title }}</div>
              <div class="item-quantity">*{{ item.qty }}</div>
              <div class="item-price ml-2">{{ item.product.price | currency }}</div>
              <div class="col-1 ml-auto">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeFromCart(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-5 mt-5 mt-sm-0 frame">
            <div class="frame-header">訂單摘要</div>
            <div class="frame-body">
              <div>
                <div class="label">商品總計</div>
                <div class="price">{{ cart.total | currency }}</div>
              </div>
              <div v-if="cart.total != cart.final_total">
                <div class="label">使用優惠卷折抵</div>
                <div class="text-danger price">-{{ cart.total-cart.final_total | currency }}</div>
              </div>
              <div class="input-group my-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="code">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="applyCoupon">套用優惠碼</button>
                </div>
              </div>
              <div class="devider"></div>
              <div>
                <div class="label">結帳總金額</div>
                <div class="price">{{ cart.final_total | currency }}</div>
              </div>
              <div class="mt-3 text-right">
                <button class="btn btn-danger" @click="isInform= true; isCart= false">前往結帳</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div class="empty-title">您的購物車內沒有商品</div>
        <div>
          <button class="btn btn-outline-dark mt-4" @click.prevent="$router.push('/')">回去逛逛</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isCart: true,

      cart: {},

      code: ""
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.cart = response.data.data;
      });
    },
    removeFromCart(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.getCart();
          this.$bus.$emit(
            "message:push",
            "刪除商品成功",
            "success",
            "100%",
            "0"
          );
          this.$bus.$emit("cart:update");
        }
      });
    },
    applyCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      this.$http.post(api, { data: { code: vm.code } }).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.cart.final_total = response.data.data.final_total;
        } else {
          this.$bus.$emit(
            "message:push",
            response.data.message,
            "danger",
            "100%",
            "0"
          );
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>