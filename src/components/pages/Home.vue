<template>
  <div>

    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm p-2">
        <!-- <router-link to="/index">
          <i class="fas fa-store fa-2x text-dark"></i>
        </router-link>-->
        <router-link class="mr-3" to="/index">
          <i class="fas fa-store fa-2x text-dark"></i>
          <h1 class="h4 ml-1 mb-0 text-dark d-inline">EasonShop</h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav font-weight-bold">
            <li class="nav-item active">
              <router-link to="/index">
                <a class="nav-link bottomLine text-dark pb-0" href="#">首頁</a>
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link to="/customerOders">
                <a class="nav-link bottomLine text-dark pb-0" href="#">商品區</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/myOrders">
                <a class="nav-link bottomLine text-dark pb-0" href="#">我的訂單</a>
              </router-link>
            </li>
            <li class="nav-item d-block d-sm-none">
              <router-link to="/login">
                <a class="nav-link bottomLine text-dark pb-0" href="#">後台登入</a>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link class="nav-link focus" to="/cart">
          <CartIcon/>
        </router-link>
        <router-link to="/login" class="nav-link focus d-none d-sm-block">
          <i class="fas fa-user fa-2x text-dark"></i>
          <span class="sr-only">後台登入</span>
        </router-link>
      </nav>
    </div>

    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import CartIcon from "@/components/CartIcon";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Footer,
    CartIcon
  }
};
</script>

<style scoped>
body {
  font-family: 微軟正黑體;
}
a:hover {
  text-decoration-line: none;
}
.focus {
  transition: all 0.2s;
}
.focus:hover {
  transform: scale(1.1);
}
.bottomLine:hover {
  border-bottom: 2px solid gray;
}
</style>