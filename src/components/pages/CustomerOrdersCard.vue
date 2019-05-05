<template>
  <div>
    <div class="card border-0 rounded shadow-sm">
      <div
        class="card-img-top"
        style="height: 300px; background-size: cover; background-repeat: no-repeat; background-position: center"
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
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
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
</template>

<script>
export default {
  props: ["item", "status"],
  data() {
    return {};
  },
  methods: {
    addtoCart(id, qty) {
      this.$emit("addtoCart", id, qty);
    }
  }
};
</script>