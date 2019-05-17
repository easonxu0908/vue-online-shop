<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="jumbotron-img" id="jumbotron-img"></div>
        </div>
        <div class="carousel-item">
          <div class="jumbotron-img2" id="jumbotron-img2"></div>
        </div>
        <div class="carousel-item">
          <div class="jumbotron-img3" id="jumbotron-img3"></div>
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
    </div>
  </div>
</template>


<script>
import $ from "jquery";
export default {
  data() {
    return {
      bannerImg: "../assets/image/david-lezcano-225889-unsplash.jpg",
      bannerImg2: "../../image/clark-street-mercantile-33919-unsplash.jpg",
      bannerImg3: "../../image/clark-street-mercantile-33931-unsplash.jpg"
    };
  },
  created() {
    $(".carousel").carousel({
      interval: true
    });
  }
};
</script>

<style scoped>
.jumbotron-img {
  background-image: url("../assets/image/david-lezcano-225889-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-size: cover;
  height: 250px;
}
.jumbotron-img2 {
  background-image: url("../assets/image/clark-street-mercantile-33919-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  height: 250px;
}
.jumbotron-img3 {
  background-image: url("../assets/image/clark-street-mercantile-33931-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  height: 250px;
}
</style>