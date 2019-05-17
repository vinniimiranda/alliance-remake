<template>
  <div class="row">
    <div class="col-xs-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 absolute-center">
      <q-card :class="{ 'bg-grey-10': dark, 'bg-white': !dark }">
        <q-card-title>
          <p :class="{ 'text-white': dark, 'text-black': dark == false }">ALI</p>
        </q-card-title>
        <q-card-separator/>
        <q-card-media align="center">
          <img src="../assets/logo-alliance01.png" class="logoLogin">
        </q-card-media>
        <q-card-separator/>
        <q-card-main>
          <p :class="' text-' + color">Plese inform your credentials</p>
          <form @submit.prevent="login">
            <div class="row">
              <div class="col">
                <q-field :color="color" error-label="Please type a valid email">
                  <q-input
                    :color="color"
                    v-model="email"
                    type="email"
                    float-label="E-mail"
                    :dark="dark"
                    required
                  />
                </q-field>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-field>
                  <q-input
                    :color="color"
                    v-model="password"
                    type="password"
                    float-label="Senha"
                    :dark="dark"
                    required
                  />
                </q-field>
              </div>
            </div>
            <br>
            <br>
            <div class="row">
              <div class="col">
                <q-field error-label="We need a valid email">
                  <q-select
                    :color="color"
                    float-label="Estação de trabalho"
                    required
                    v-model="workStation"
                    :dark="dark"
                    :options="selectOptions"
                  />
                </q-field>
              </div>
            </div>
            <div class="row justify-center">
              <h6 :class="'cursor-pointer text-' + color">Esqueceu sua senha?</h6>
            </div>
            <div class="row">
              <div class="col-12">
                <q-field>
                  <q-btn
                    :color="color"
                    :glossy="glossy"
                    size="lg"
                    :loading="buttonLoading"
                    align="center"
                    style="width:100%"
                    label="ENTRAR"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      workStation: "",
      buttonLoading: false,
      selectOptions: [
        {
          label: "SALA USG 01 - LAUDOS",
          value: "goog"
        },
        {
          label: "SALA USG 03 - TERREO",
          value: "fb"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      color: "getColor",
      glossy: "getGlossy",
      dark: "getDarken"
    })
    
  },
  methods: {
    login() {
      this.buttonLoading = true;
      setTimeout(() => {
        this.buttonLoading = false;
        if (this.workStation == "") {
          this.$q.notify({
            message: "Selecione uma estação de trabalho",
            timeout: 3000,
            type: "warning",
            color: "warning",
            position: "top-right"
          });
          return false;
        }

        if (this.email != "flavio.miranda@wtt.com.br") {
          this.$q.notify({
            message: "Nenhum usuário encontrado para o e-mail digitado.",
            timeout: 3000,
            type: "negative",
            color: "negative",
            position: "top-right"
          });
        } else if (this.password !== "12345678") {
          this.$q.notify({
            message: "Senha inválida.",
            timeout: 3000,
            type: "negative",
            color: "negative",
            position: "top-right"
          });
        } else {
          this.$q.notify({
            message: "Logado com sucesso",
            timeout: 3000,
            type: "positive",
            color: "postive",
            position: "top-right"
          });
          this.$router.push({ name: "home" });
        }
      }, 2500);
    }
  }
};
</script>

<style>
.bg-image{
  background-image: url("../assets/bg.svg") !important;
}
</style>