<template>
  <div class="row fixed-center items-center">
    <div class="col-12">
      <q-card>
        <q-card-title>Ali</q-card-title>
        <q-card-separator/>
        <q-card-media>
          <img
            src="http://192.168.102.134:5000/static/assets/img/logos/logo-alliance01.png"
            class="logoLogin"
          >
        </q-card-media>
        <q-card-separator/>
        <q-card-main>
          <p>Plese inform your credentials</p>
          <form @submit="login">
            <div class="row">
              <div class="col">
                <q-field error-label="Please type a valid email">
                  <q-input
                    color="secondary"
                    v-model="email"
                    type="email"
                    suffix="wtt.com.br"
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
                    color="secondary"
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
                    color="secondary"
                    float-label="Workstation"
                    required
                    v-model="workStation"
                    :options="selectOptions"
                  />
                </q-field>
              </div>
            </div>
            <br>
            <br>
            <div class="row">
              <div class="col-12">
                <q-field>
                  <q-btn
                    color="secondary"
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

<style>
.logoLogin {
  width: 25rem !important;
}
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
  methods: {
    login() {
      this.buttonLoading = true
      setTimeout(() => {
        if (this.workStation == "") {
          this.$q.notify({
          message: "You need select a workstation",
          timeout: 3000,
          type: 'warning',
          color: 'warning',
          position: 'top-right'
        })
          this.buttonLoading = false
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
          type: 'positive',
          color: 'postive',
          position: 'top-right'
        })
        this.buttonLoading = false
        this.$router.push('/system/')
      }, 1500);
    }
  }
};
</script>
