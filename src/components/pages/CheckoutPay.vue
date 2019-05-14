<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <section class="row mt-4 mt-md-5">
      <div class="col-10 col-md-8 mx-auto">
        <h3 class="text-center text-success" v-if="order.is_paid">
          <i class="fas fa-check mr-4"></i> 訂購成功
        </h3>
        <h3 class="text-center" v-if="!order.is_paid">確認付款</h3>
        <h5 class="py-3 mt-4 mt-md-5 mb-2 text-center bg-light">訂單資訊</h5>
        <div class="text-center font-weight-bold">
          訂單編號：
          <span
            class="orderID position-relative"
            :data-clipboard-text="orderID"
            type="text"
            @click.prevent="copy()"
          >{{orderID}}</span>
          <span
            class="copy font-weight-light text-muted ml-1 mt-1 position-absolute d-md-inline d-none"
            style="font-size:13px"
          >{{copyStatus}}</span>
          <br>
          <span
            class="copy font-weight-light text-muted mt-1 d-md-none d-block"
            style="font-size:13px"
          >{{copyStatus}}</span>
        </div>

        <div class="mt-2 text-info font-weight-bold pt-3" style="border-top:1px solid #64eaa9">
          <i class="far fa-user mr-1"></i> 訂購人
        </div>
        <ul style="list-style:none" class="mt-2 m-0 p-0">
          <li>
            <span class="d-inline-block" style="width: 55px;">姓名：</span>
            {{user.name}}
          </li>
          <li>
            <span class="d-inline-block" style="width: 55px;">Email：</span>
            {{user.email}}
          </li>
          <li>
            <span class="d-inline-block" style="width: 55px;">電話：</span>
            {{user.tel}}
          </li>
          <li>
            <span class="d-inline-block" style="width: 55px;">地址：</span>
            {{user.address}}
          </li>
          <li v-if="order.message">
            <span class="d-inline-block" style="width: 55px;">留言：</span>
            {{order.message}}
          </li>
        </ul>
        <div class="text-info font-weight-bold mt-3 pt-3" style="border-top:1px solid #64eaa9">
          <i class="fas fa-shopping-cart mr-1"></i>訂購商品明細
        </div>

        <table class="table mt-4">
          <thead>
            <tr>
              <th width="200">產品名稱</th>
              <th width="120">數量</th>
              <th width="120">單價</th>
              <th width="100">總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in products" :key="index">
              <td>{{item.product.title}}</td>
              <td>{{item.qty}} {{ item.product.unit}}</td>
              <td>$ {{ item.product.price}}</td>
              <td>$ {{ item.final_total}}</td>
            </tr>
          </tbody>
        </table>
        <div class="row d-flex justify-content-end mt-4">
          <button class="btn btn-outline-primary" v-if="!order.is_paid" @click.prevent="pay()">確認付款</button>
          <router-link class="btn btn-secondary mr-3" v-if="order.is_paid" to="/">繼續逛逛</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: ["step"],
  data() {
    return {
      orderID: "",
      products: {},
      user: {},
      order: {},
      copyStatus: "可複製",
      isLoading: false
    };
  },
  methods: {
    getOrderInfo() {
      var vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${
        vm.orderID
      }`;
      this.$http.get(api).then(response => {
        if (response.data.success && response.data.order) {
          console.log(response);
          vm.isLoading = false;
          vm.order = response.data.order;
          vm.products = response.data.order.products;
          vm.user = response.data.order.user;
        } else {
          vm.isLoading = false;
          console.log(response);
        }
      });
    },
    copy() {
      var clipboard = new Clipboard(".orderID");
      this.copyStatus = "可複製";
      clipboard.on("success", e => {
        this.copyStatus = "已複製";
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持複製
        alert("該瀏覽器不支持自動複製");
        // 釋放內存
        clipboard.destroy();
      });
    },
    pay() {
      let vm = this;
      this.$validator.validate().then(result => {
        if (result) {
          const payApi = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
          }/pay/${vm.orderID}`;
          vm.$http.post(payApi).then(response => {
            if (response.data.success) {
              console.log(response);
              this.$emit("step", (this.currentStep = "finish"));
              vm.getOrderInfo();
            } else {
              alert("付款失敗");
              // console.log(response);
            }
          });
        } else {
          alert("資料有誤");
          // console.log("資料有誤")
        }
      });
    }
  },
  created() {
    this.orderID = this.$route.params.orderID;
    console.log(this.orderID);
    this.getOrderInfo();
    this.$emit("step", (this.currentStep = "pay"));
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
