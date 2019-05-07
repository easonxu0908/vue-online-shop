<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <section class="row">
      <!-- 購物籃有商品 start -->
      <div class="col-md-8 col-10 mt-0 mt-md-5 mx-auto" v-if="cart.length !=0">
        <div class="card d-none d-md-block" v-if="cart.length !=0">
          <div class="card-header" id="headingOne">
            <h6 class="mb-0 d-flex align-items-center">
              <a data-toggle="collapse" href="#collapseOne">
                顯示購物車細節
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <span class="ml-auto mt-2 text-muted" style="font-size:0.8rem;">共 {{cart.length}}項</span>
              <span class="h3 ml-2 mb-0">${{finalTotal}}</span>
            </h6>
          </div>
        </div>
        <div id="collapseOne" class="collapse mt-3" v-if="cart.length !=0">
          <table class="table table-sm">
            <thead>
              <tr>
                <th width="80"></th>
                <!-- <th></th> -->
                <th>商品名稱</th>
                <th width="100">數量</th>
                <th width="100">單價</th>
                <th width="80">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in cart" :key="index">
                <td class="align-middle text-center">
                  <a
                    href="#"
                    class="text-muted"
                    data-toggle="modal"
                    @click.prevent="removeModal(item)"
                  >
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  </a>
                </td>
                <!-- <td class="align-middle" style="width:130px">
                  <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" 
                  style="width:100%;height:130px;background-size:cover;background-position:center">
                </td>-->
                <td class="align-middle">
                  <router-link :to="{path: 'product/'+item.product.id}">{{item.product.title}}</router-link>
                </td>
                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                <td class="align-middle">{{item.product.price | currency}}</td>
                <td class="align-middle">{{item.final_total | currency}}</td>
              </tr>
              <!-- <tr>
                <td colspan="4" class="text-right">運費</td>
                <td class="text-right">
                  <strong>${{shippingFee}}</strong>
                  <div
                    class="font-italic text-muted"
                    style="font-size:13px;margin-left:-16px;"
                  >-滿 500 免運費</div>
                </td>
              </tr>-->
              <tr>
                <td colspan="4" class="text-right font-weight-bold mt-1">合計</td>
                <td class="text-right font-weight-bold">
                  <strong>${{finalTotal}}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- mobile size start -->
        <h5 class="d-block d-md-none py-3 mb-2 text-center bg-light">購物車細節</h5>
        <table class="table table-sm d-table d-md-none">
          <tbody>
            <tr v-for="(item,index) in cart" :key="index">
              <td class="align-middle text-center" width="30">
                <a
                  href="#"
                  class="text-muted"
                  data-toggle="modal"
                  @click.prevent="removeModal(item)"
                >
                  <i class="fas fa-trash-alt" aria-hidden="true"></i>
                </a>
              </td>
              <td class="align-middle" width="60">
                <img :src="item.product.imageUrl" class="img-fluid img-thumbnail table-mobile-img">
              </td>
              <td class="align-middle" width="100">
                <router-link :to="{path: 'product/'+item.product.id}">{{item.product.title}}</router-link>
                <div class="text-muted" style="font-size:0.8rem">
                  數量：{{item.qty}} {{item.product.unit}}
                  <br>
                  單價：{{item.product.price | currency}}
                  <br>
                  總價：{{item.final_total | currency}}
                  <br>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-right font-weight-bold">
                <strong>合計 &nbsp; ${{finalTotal}}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- mobile size end -->

        <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
        <form id="needs-validation" novalidate>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="username">姓名</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="name"
                placeholder="姓名"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('name')}"
                v-model="userdata.user.name"
              >
              <!-- <div class="invalid-feedback">請輸入姓名</div> -->
            </div>
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                name="email"
                :class="{'is-invalid': errors.has('email')}"
                v-validate="'required|email'"
                v-model="userdata.user.email"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="tel">電話</label>
            <input
              type="tel"
              class="form-control"
              id="tel"
              placeholder="0912345678"
              name="tel"
              v-validate="'required|numeric'"
              :class="{'is-invalid': errors.has('tel')}"
              v-model="userdata.user.tel"
            >
          </div>
          <div class="form-group">
            <label for="address">地址</label>
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder="彰化縣幸福路520號"
              name="address"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('address')}"
              v-model="userdata.user.address"
            >
          </div>
          <div class="form-group">
            <label for="message">
              留言
              <span class="font-italic text-muted ml-1" style="font-size:13px">(選填)</span>
            </label>
            <textarea class="form-control" id="message" rows="3" v-model="userdata.message"></textarea>
          </div>
          <div class="text-right">
            <router-link to="/" class="btn btn-secondary mr-3">繼續選購</router-link>
            <button type="submit" class="btn btn-primary mr-3" @click.prevent="createOrder()">確認付款</button>
          </div>
        </form>
      </div>
      <!-- 購物籃有商品 end -->

      <!-- 購物籃無商品 start -->
      <div class="col-md-8 mx-auto col-10" v-else>
        <h5 class="py-3 mt-2 mt-md-5 mb-2 text-center bg-light">購物車暫無商品</h5>
        <div class="text-right">
          <router-link to="/" class="btn btn-secondary mt-4">回商店選購</router-link>
        </div>
      </div>
      <!-- 購物籃無商品 end -->
    </section>

    <!--del modal start-->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="tempItem.product">
              確認刪除
              <span class="text-success">{{tempItem.product.title}}</span> ?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button
              type="button"
              class="btn btn-outline-danger px-5"
              @click.prevent="delItem()"
              :class="{'disabled':status.del}"
            >
              確認
              <i class="fas fa-spinner fa-spin pl-2 ml-1" v-if="status.del"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--del modal end-->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: ["step", "userdata", "propsOrderID"],
  data() {
    return {
      cart: [],
      finalTotal: 0,
      tempItem: {},
      isLoading: false,
      status: {
        del: false
      }
    };
  },
  methods: {
    getCartList() {
      var vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.cart = response.data.data.carts;
        vm.finalTotal = response.data.data.final_total;
        if (vm.finalTotal > 500) vm.shippingFee = 0;
        else vm.shippingFee = 80;
      });
    },
    createOrder() {
      var vm = this;
      this.$validator.validate().then(result => {
        if (result) {
          const orderApi = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
          }/order`;
          vm.isLoading = true;
          vm.$http.post(orderApi, { data: vm.userdata }).then(response => {
            if (response.data.success) {
              vm.orderID = response.data.orderId;
              console.log(vm.orderID);
              vm.propsOrderID = vm.orderID;
              console.log(vm.propsOrderID);
              this.$bus.$emit("cart:update");
            } else {
              if (response.message) {
                alert(response.data.message);
              } else if (response.messages) {
                alert(response.data.messages);
              }
            }
          });
          this.$router.push(`/checkout/pay`);
          this.$emit("step", (this.currentStep = "pay"));
        } else {
          // console.log("資料有誤")
        }
      });
    }
  },
  created() {
    this.getCartList();
    this.$emit("step", (this.currentStep = "info"));
    $(".navbar-nav").css("marginRight", "0px");
  }
};
</script>

<style>
table a:hover {
  text-decoration: none;
}
.table-mobile-img {
  width: 100%;
  max-width: 120px;
  height: 80px;
  background-size: cover;
  background-position: center;
}
</style>
