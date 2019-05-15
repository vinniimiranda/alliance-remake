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
                    float-label="Email"
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
                    float-label="Password"
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
                    float-label="Workstation"
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
    <!-- <q-layout>
      <q-layout-footer :class="{'bg-black' : dark, 'bg-white' : !dark}">
        <div class="row q-my-sm">
          <img src="../assets/Logomarca_Biower_3.png" class="footerLogo">
          
        </div>
      </q-layout-footer>
    </q-layout>-->
  </div>
</template>

<style lang="scss">
.logoLogin {
  width: 25rem !important;
}
.footerLogo {
  width: 10%;
  height: 20%;
  margin: auto;
}

.bg-image {
  background-image: url("../assets/bg.svg") !important;
  background-size: 20rem !important;
  background-blend-mode: multiply;
  transition: all 0.4s;
}
</style>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "flavio.miranda@wtt.com.br",
      password: "12345678",
      workStation: "goog",
      buttonLoading: false,
      selectOptions: [
        {
          label: "Google",
          value: "goog"
        },
        {
          label: "Facebook",
          value: "fb"
        }
      ]
    };
  },
  computed: {
    color() {
      return this.$store.getters.getColor;
    },
    glossy() {
      return this.$store.getters.getGlossy;
    },
    dark() {
      return this.$store.getters.getDarken;
    }
  },
  methods: {
    login() {
      this.buttonLoading = true;
      setTimeout(() => {
        this.buttonLoading = false;
        if (this.workStation == "") {
          this.$q.notify({
            message: "You need select a workstation",
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
            message: "Logged in successfully",
            timeout: 3000,
            type: "positive",
            color: "postive",
            position: "top-right"
          });
          this.$router.push({ name: "home" });
        }
      }, 2500);
      // }

      // this.buttonLoading = false;
      // }, 3500);
    }
  }
};
</script>
