<template>
  <div class="row " >
      
        
          <div class="col-xs-11 col-sm-10 col-md-6 col-lg-4 col-xl-3  absolute-center	">
            <q-card class="bg-white">
              <q-card-title>ALI</q-card-title>
              <q-card-separator/>
              <q-card-media align="center">
                <img src="../assets/logo-alliance01.png" class="logoLogin">
              </q-card-media>
              <q-card-separator/>
              <q-card-main>
                <p :class="' text-'+ color">Plese inform your credentials</p>
                <form @submit="login">
                  <div class="row">
                    <div class="col">
                      <q-field error-label="Please type a valid email">
                        <q-input
                          :color="color"
                          v-model="email"
                          type="email"
                          float-label="Email"
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
                          :options="selectOptions"
                        />
                      </q-field>
                    </div>
                  </div>
                  <div class="row justify-center">
                    <h6 :class="'cursor-pointer text-'+ color">Esqueceu sua senha?</h6>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-field>
                        <q-btn
                          :color="color"
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
            <q-card class="bg-white q-mt-sm">
              <q-card-main align="center" class>
                <img src="../assets/Logomarca_Biower_3.png" class="footerLogo">
              </q-card-main>
            </q-card>
          </div>
        
      
    
  </div>
</template>

<style>
.logoLogin {
  width: 25rem !important;
}
.footerLogo {
  width: 10rem !important;
}
body {
}
</style>
<style scoped>
</style>


<script>
export default {
  name: "Login",
  data() {
    return {
      email: "flavio.miranda@wtt.com.br",
      password: "12345678",
      workStation: "fb",
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
    }
  },
  methods: {
    login() {
      this.buttonLoading = true;
      setTimeout(() => {
        if (this.workStation == "") {
          this.$q.notify({
            message: "You need select a workstation",
            timeout: 3000,
            type: "warning",
            color: "warning",
            position: "top-right"
          });
          this.buttonLoading = false;
          return false;
        }

        let form = {
          email: this.email,
          password: this.password,
          workStation: this.workStation
        };
        this.$q.notify({
          message: "Logged in successfully",
          timeout: 3000,
          type: "positive",
          color: "postive",
          position: "top-right"
        });
        this.buttonLoading = false;
        this.$router.push("/system/");
      }, 1500);
    }
  }
};
</script>
