<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="row justify-content-center mt-4 mt-md-5">
      <div class="col-10 col-md-8">
        <h4 class="text-center">總金額：{{ orderTotal }}</h4>
        <h5 class="py-3 mt-4 mt-md-5 mb-2 text-center bg-light">付款</h5>
        <div class="form-row">
          <div class="form-group col-md">
            <label for>姓名</label>
            <input
              type="text"
              class="form-control"
              placeholder="姓名"
              name="name"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('name')}"
            >
          </div>
          <div class="form-group col-md">
            <label for>電話</label>
            <input
              type="text"
              class="form-control"
              placeholder="電話"
              name="tel"
              v-validate="'required|numeric'"
              :class="{'is-invalid': errors.has('tel')}"
            >
          </div>
        </div>

        <div class="row d-flex justify-content-end mt-4">
          <button class="btn btn-secondary mr-3" @click.prevent="backToInfo()">回訂單資料</button>
          <button class="btn btn-outline-primary" @click.prevent="pay()">確認付款</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: ["step", "userdata"],
  data() {
    return {
      orderID: "",
      orderTotal: 0,
      cart: [],
      isLoading: false,
      status: {
        pay: false
      }
    };
  },
  methods: {
    getCartList() {
      var vm = this;
      vm.isLoading = true;
      const cartApi = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart`;
      this.$http.get(cartApi).then(response => {
        vm.isLoading = false;
        vm.cart = response.data.data.carts;
        vm.orderTotal = response.data.data.final_total;
      });
    },
    pay() {
      var vm = this;
      this.$validator.validate().then(result => {
        if (result) {
          //建立訂單 start-------------------------------
          function order() {
            return new Promise((resolve, reject) => {
              const orderApi = `${process.env.APIPATH}/api/${
                process.env.CUSTOMPATH
              }/order`;
              vm.isLoading = true;
              vm.$http.post(orderApi, { data: vm.userdata }).then(response => {
                if (response.data.success) {
                  vm.orderID = response.data.orderId;
                  resolve(response);
                } else {
                  if (response.message) {
                    alert(response.data.message);
                  } else if (response.messages) {
                    alert(response.data.messages);
                  }
                }
              });
            });
          }
          //付款start ---------------------
          order().then(response => {
            const payApi = `${process.env.APIPATH}/api/${
              process.env.CUSTOMPATH
            }/pay/${vm.orderID}`;
            vm.$http.post(payApi).then(response => {
              if (response.data.success) {
                this.$router.push(`/finish/${vm.orderID}`);
                this.$emit("step", (this.currentStep = "finish"));
              } else {
                alert("付款失敗");
              }
            });
          });
        } else {
          // console.log("資料有誤")
        }
      });
    },
    backToInfo() {
      this.$router.push("/checkout");
      this.$emit("step", (this.currentStep = "info"));
    }
  },
  created() {
    this.getCartList();
    this.$emit("step", (this.currentStep = "pay"));

    //防止沒有使用者資料直接導到付款頁面
    if (
      this.userdata.user.name.trim() == "" ||
      this.userdata.user.email.trim() == "" ||
      this.userdata.user.address.trim() == "" ||
      this.userdata.user.tel.trim() == ""
    ) {
      this.$router.push(`/checkout`);
    }
  }
};
</script>