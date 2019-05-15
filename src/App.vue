<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background-image: url("./assets/bg.svg") !important;
  background-size: 20rem !important;
  background-blend-mode: multiply;
  animation: draw 1400ms ease-in-out 4ms forwards;
}
</style>

<script>
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