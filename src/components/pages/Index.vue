<template>
  <div>
    <BannerCarousel></BannerCarousel>
    <div class="container py-3">
      <h1 class="page_title">關於這個網站</h1>
      <p class="text-justify p-3 px-md-5">這是一個練習 Vue 的作品</p>
      <h2 class="text-center">本期熱銷商品</h2>
      <prodSilder></prodSilder>
    </div>
  </div>
</template>

<script>
import prodSilder from "@/components/prodsilder";
import BannerCarousel from "@/components/BannerCarousel";

export default {
  components: {
    prodSilder,
    BannerCarousel
  }
};
</script>

