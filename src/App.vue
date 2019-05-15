<template>
  <div id="app">
    
    <router-view />
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
     if (this.$store.getters.getDarken) {
        $("body").addClass("bg-dark bg-image");
      } else {
        $("body").removeClass("bg-dark");
        $("body").addClass("bg-white bg-image");
      }
  },
}
</script>