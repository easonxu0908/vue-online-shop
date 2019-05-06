<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand p-2" href="#">EASON</a>
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
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link" href="#">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/searchOrder">
              <a class="nav-link" href="#">訂單查詢</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="d-md-inline-block">
              <a class="nav-link" href="#">管理者登入</a>
            </router-link>
          </li>
        </ul>
      </div>
      <router-link class="d-none d-sm-inline-block mr-4 ml-3 mt-1" to="/Cart">
        <CartIcon/>
      </router-link>
    </nav>
    <a href="#" id="gotoTop" title="回到頂端">
      <i class="fas fa-arrow-alt-circle-up"></i>
    </a>
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

let vm = this;

window.onscroll = function() {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("gotoTop").style.display = "block";
  } else {
    document.getElementById("gotoTop").style.display = "none";
  }
}

// window.addEventListener("resize", resizeFunction);

// function resizeFunction() {
//   if (screen.width < 540) {
//     document.getElementById("gotoTop").style.right = 0;
//   } else {
//     document.getElementById("gotoTop").style.right = 30;
//   }
// }
</script>

<style scoped>
body {
  font-family: 微軟正黑體;
}
#gotoTop {
  display: none;
  position: fixed;
  bottom: 15%;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  color: rgb(0, 139, 0);
  cursor: pointer;
  font-size: 40px;
  opacity: 0.6;
  transition: 0.2s;
}

#gotoTop:hover {
  opacity: 1;
}
</style>