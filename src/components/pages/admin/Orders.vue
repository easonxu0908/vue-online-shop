<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="100">編號</th>
            <th width="100">客戶姓名</th>
            <th width="100">電話</th>
            <th width="100">Email</th>
            <th>住址</th>
            <th width="120">總消費金額</th>
            <th width="100">是否付款</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in orders" :key="item.id">
            <td>{{item.create_at}}</td>
            <td>{{item.user.name}}</td>
            <td>{{item.user.tel}}</td>
            <td>{{item.user.email}}</td>
            <td>{{item.user.address}}</td>
            <td class="text-right">{{item.total | currency}}</td>
            <td>
              <span v-if="item.is_paid" class="text-success">付款</span>
              <span v-else>未付款</span>
            </td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">編輯</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分頁-->
    <!-- <Pagination class="ml-auto" :pagination="pagination" v-on:getPageProducts="getOrders"/> -->

    <!-- 修改訂單 -->

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
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <p>訂單編號: {{tempOrder.create_at}}</p>
                <div class="form-group">
                  <label for="title">客戶姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempOrder.user.name"
                    id="title"
                    placeholder="請輸入客戶姓名"
                  >
                </div>
                <div class="form-group">
                  <label for="title">電話</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user.tel"
                    placeholder="請輸入電話"
                  >
                </div>
                <div class="form-group">
                  <label for="title">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user.email"
                    placeholder="請輸入Email"
                  >
                </div>
                <div class="form-group">
                  <label for="title">總消費金額</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempOrder.total"
                    id="title"
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempOrder.is_paid"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label class="form-check-label" for="is_enabled">是否付款</label>
                    <span v-if="tempOrder.is_paid" class="badge badge-success">已付款</span>
                    <span v-else class="badge badge-danger">未付款</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/pages/Pagination.vue";
export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        user: {}
      },
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        // console.log(vm.pagination);
      });
    },
    openModal(item) {
      this.tempOrder = Object.assign({}, item);
      //   console.log(this.tempOrder);
      $("#productModal").modal("show");
    },
    updataOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/order/${vm.tempOrder.id}`;
      console.log(this.tempOrder);
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getOrders();
          // console.log("修改成功");
        } else {
          $("#productModal").modal("hide");
          vm.getOrders();
          // console.log("修改失敗");
        }
      });
    },
    deleteModal(item) {
      this.tempOrder = Object.assign({}, item);
      $("#delProductModal").modal("show");
      // console.log(item);
    }
  },
  created() {
    this.getOrders();
  }
};
</script>