<template>
  <div>
    <!-- <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="jumbotron jumbotron-fluidalign-items-end jumbotron-img"></div>
        </div>
        <div class="carousel-item">
          <div class="jumbotron jumbotron-fluidalign-items-end jumbotron-img2"></div>
        </div>
        <div class="carousel-item">
          <div class="jumbotron jumbotron-fluidalign-items-end jumbotron-img3"></div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>-->
    <!-- <BannerCarousel></BannerCarousel> -->
    <topsilder></topsilder>
    <div class="container py-3">
      <ul class="alert alert-primary">
        <li>2018.12.24</li>
        <li>
          <span class="tag tag-danger">今日限定</span>
        </li>
        <li>「coupon50」這…難道是什麼的密碼嗎？</li>
      </ul>
    </div>
    <div class="container py-3">
      <h1 class="page_title">關於CrossGate</h1>
      <p class="text-justify p-3 px-md-5">
        這是一個練習 Vue 的作品，至於為什麼要叫做 CrossGate 呢？答案是因為作者很喜歡魔力寶貝，本來是想做個這一系列的主題商城，但註冊完 API 才發現，
        尷尬了...可以用的素材圖怎麼這麼少！後來弄著弄著就變成販售 Switch、PS4、3DS 的商城了，希望各位喜歡。
        <em
          class="blockquote-footer"
        >不過還是私心的置入一些魔力寶貝的圖片(笑)</em>
      </p>
      <h2 class="page_title">本期熱銷商品</h2>
      <prodSilder></prodSilder>
    </div>
  </div>
</template>

<script>
import prodSilder from "@/components/prodsilder";
import BannerCarousel from "@/components/BannerCarousel";
import topsilder from "@/components/topsilder";
export default {
  components: {
    prodSilder,
    BannerCarousel,
    topsilder
  }
};
</script>

<style scoped>
.jumbotron-img {
  background-image: url("../../../image/david-lezcano-225889-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-size: cover;
  height: 250px;
}
.jumbotron-img2 {
  background-image: url("../../../image/clark-street-mercantile-33919-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  height: 250px;
}
.jumbotron-img3 {
  background-image: url("../../../image/clark-street-mercantile-33931-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  height: 250px;
}
</style>