<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<script>
import "./styles/style.scss";
export default {
  beforeMount() {

    let body = document.getElementById("body");
    let classList = body.classList;
    if (this.$store.getters.getDarken) {
      classList.remove("bg-image");
      classList.remove("bg-white");
      classList.remove("bg-dark");
      classList.add("bg-dark");
      classList.add("bg-image");
    } else {
      classList.remove("bg-image");
      classList.remove("bg-dark");
      classList.remove("bg-white");
      classList.add("bg-white");
      classList.add("bg-image");
    }
  }
};
</script>