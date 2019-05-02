<template>
  <div>
    <button
      class="btn btn-sm btn-cart drop"
      data-toggle="dropdown"
      data-flip="false"
      @click.prevent="getCartList()"
    >
      <i class="fa fa-shopping-cart text-muted fa-2x" aria-hidden="true"></i>
      <span class="badge badge-pill badge-danger">{{ cartlist.length }}</span>
      <span class="sr-only">unread messages</span>
    </button>
    <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px;" data-offset="400">
      <h6>已選擇商品</h6>
      <table class="table table-sm">
        <tbody v-for="(item,index) in cartlist" :key="index">
          <tr v-if="cartlist">
            <td class="align-middle text-center">
              <a href="#" @click="removeModal(item)" class="text-muted">
                <i class="far fa-trash-alt"></i>
              </a>
            </td>
            <td class="align-middle">
              <router-link :to="{path: 'product/'+item.product.id}">{{item.product.title}}</router-link>
            </td>
            <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
            <td class="align-middle text-right">${{item.final_total}}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="d-flex justify-content-between font-weight-bold">
        總金額
        <span>${{finalTotal}}</span>
      </div>
      <hr>
      <router-link class="btn btn-primary btn-block" to="/checkout">
        <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
      </router-link>
    </div>

    <div
      class="modal fade"
      id="removeModal"
      ref="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @keyup.enter="delCart()"
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
            <p>
              確認刪除
              <span v-if="tempDel.product" class="text-success">{{tempDel.product.title}}</span>商品 ?
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              :class="{'disabled':status.del }"
            >否</button>
            <button
              type="button"
              class="btn btn-outline-danger px-5"
              @click="delCart()"
              :class="{'disabled':status.del }"
            >
              確認
              <i class="fas fa-spinner fa-spin pl-2 ml-1" v-if="status.del"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  props: ["getData"],
  data() {
    return {
      cartlist: [],
      tempDel: {},
      finalTotal: 0,
      message: "",
      status: {
        del: false,
        message: false,
        messageColor: ""
      }
    };
  },
  methods: {
    getCartList() {
      var vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.cartlist = response.data.data.carts;
        vm.finalTotal = response.data.data.final_total;
        if (vm.cartlist.length == 0) {
          vm.status.message = false;
        }
      });
    },
    removeModal(item) {
      this.tempDel = item;
      $("#removeModal").modal("show");
      // $(".navbar").removeClass('fixed-top');
    },
    delCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${
        this.tempDel.id
      }`;
      this.status.del = true;
      this.$http.delete(api).then(response => {
        this.status.del = false;
        $("#removeModal").modal("hide");
        this.tempDel = {};
        this.getCartList();
        // $(".navbar").addClass('fixed-top');
      });
    },
    hiddenModal() {
      // $(".navbar").addClass('fixed-top');
    }
  },
  created() {
    this.getCartList();
    const vm = this;
    vm.$bus.$on("DropMenu:getCartList", () => {
      vm.getCartList();
    });
  },
  mounted() {
    // $(this.$refs.removeModal).on("hidden.bs.modal", this.hiddenModal)
  }
};
</script>
<style>
.dropdown {
  position: fixed;
  top: 10px;
  right: 75px;
  z-index: 100000;
}
</style>
