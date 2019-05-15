<template>
  <div class="row">
    <div class="col-xs-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 absolute-center">
      <q-card :class="{ 'bg-grey-10': dark, 'bg-white': !dark }">
        <q-card-title>
          <p :class="{ 'text-white': dark, 'text-black': dark == false }">
            ALI
          </p>
        </q-card-title>
        <q-card-separator />
        <q-card-media align="center">
          <img src="../assets/logo-alliance01.png" class="logoLogin" />
        </q-card-media>
        <q-card-separator />
        <q-card-main>
          <p :class="' text-' + color">
            Digite seu e-mail para recuperar sua senha
          </p>
          <form>
            <div class="row">
              <div class="col">
                <q-field :color="color" error-label="Please type a valid email">
                  <q-input
                    :color="color"
                    v-model="email"
                    type="email"
                    float-label="Email"
                    :dark="dark"
                    required
                  />
                </q-field>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-field>
                  <q-btn
                    :color="color"
                    size="lg"
                    align="center"
                    style="width:100%"
                    label="Enviar"
                    type="submit"
                    push
                  />
                </q-field>
              </div>
            </div>
          </form>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  computed: {
    color() {
      return this.$store.getters.getColor;
    },
    dark() {
      return this.$store.getters.getDarken;
    }
  }
};
</script>
