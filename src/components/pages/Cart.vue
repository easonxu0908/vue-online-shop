<template>
  <div>
    <div class="container" v-if="cart.total!=0">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-9">
          <!-- <div
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
          </div>-->

          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center justify-content-center">
                <a data-toggle="collapse" href="#collapseOne">
                  收合購物車
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse show mt-3">
            <table class="table table-sm table-borderless">
              <thead>
                <tr>
                  <th width="100"></th>
                  <th>
                    <span class="ml-2">商品名稱</span>
                  </th>
                  <th width="60">數量</th>
                  <th width="60" class="text-right">小計</th>
                  <th width="60"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <div
                      class="card"
                      style="height: 100px; background-size: cover; background-repeat: no-repeat; background-position: center"
                      :style="{backgroundImage:`url(${item.product.imageUrl})`}"
                    ></div>
                  </td>
                  <td class="align-middle">
                    <span class="ml-2">{{ item.product.title }}</span>
                  </td>
                  <td class="align-middle">{{ item.qty }}</td>
                  <td class="align-middle text-right">{{ item.product.price | currency }}</td>
                  <td class="align-middle text-right">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeFromCart(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 mt-sm-0">
          <!-- <div class="frame-header">訂單摘要</div> -->
          <!-- <div class="frame-body">
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
              <button class="btn btn-danger">前往結帳</button>
            </div>
          </div>-->

          <div class="card">
            <div class="card-header h5">訂單摘要</div>
            <div class="card-body">
              <p class="card-text h6 d-flex">
                <span>商品總計</span>
                <span class="ml-auto">{{ cart.total | currency }}</span>
              </p>

              <div class="input-group my-4 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="code">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="applyCoupon">套用優惠碼</button>
                </div>
              </div>

              <div class="border border-muted border-top-1 mb-5"></div>

              <p class="card-text h6 d-flex">
                <span>結帳總金額</span>
                <span class="ml-auto">{{ cart.final_total | currency }}</span>
              </p>

              <div class="text-right mt-3">
                <button class="btn btn-danger">前往結帳</button>
              </div>
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
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,

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

<style scoped>
/* .cart,
.inform {
  width: 100vw;
  margin-top: 90px;
}
.item {
  width: 100%;
}
.item-image {
  background-size: auto 100%;
  background-position: bottom center;
  width: 80px;
  height: 80px;
}
.item-title,
.item-price {
  font-size: 18px;
}
.item-quantity {
  font-size: 16px;
}
.frame {
  max-width: 380px;
  min-width: 280px;
}
.frame-header {
  background-color: #ddd;
  font-size: 20px;
  line-height: 50px;
  padding: 10px 15px;
}
.frame-body {
  border: 1px solid #ddd;
  font-size: 18px;
  line-height: 36px;
  padding: 10px 15px 20px;
}
.label {
  display: inline-block;
}
.price {
  display: inline-block;
  float: right;
}
.devider {
  height: 2px;
  margin: 18px 0;
  background-color: #ddd;
}
.empty-title {
  font-size: 24px;
}
.inform {
  padding: 5% 10%;
}
.detail-table {
  font-size: 18px;
  min-width: 50%;
}
.detail-table td {
  padding: 0 10px;
}
.note,
.coupon {
  vertical-align: bottom;
}
.note {
  height: 45px;
}
.checkout-price {
  height: 35px;
  border-top: 2px solid #ddd;
}
.form-group {
  font-size: 18px;
} */
</style>