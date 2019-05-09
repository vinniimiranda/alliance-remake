<template>
  <div class="row">
    <div class="col-6">
      <q-card>
        <q-card-title>
          Card Title
          <router-link :to="{name: 'home'}">
            <q-btn right>
            <q-icon name="arrow_back" align="rigth" size="2rem"/>
            </q-btn>
          </router-link>
        </q-card-title>
        <q-card-separator/>
        <q-card-main>Card Content</q-card-main>
      </q-card>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  created() {
    console.log(this.$route.params.id);
  }
};
</script>
