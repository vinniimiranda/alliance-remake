<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar :color="color" :glossy="glossy">
        <q-btn flat dense round @click="leftMenu = !leftMenu" aria-label="Menu" icon="menu"/>

        <q-toolbar-title>CLÍNICA MODELO II - MEDICINA DIAGNÓSTICA</q-toolbar-title>
        <q-btn
          flat
          dense
          round
          left
          aria-label="Menu"
          :class="{ 'text-grey-3': dark }"
          icon="wb_sunny"
          @click.native="dark = !dark, changeBG()"
        />
        <q-btn
          flat
          dense
          round
          left
          @click="rightMenu = !rightMenu"
          aria-label="Menu"
          icon="settings"
        />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftMenu"
      :content-class="['text-' + color, 'q-pa-sm']"
      side="left"
      :overlay="fixedMenu"
    >
      <q-list no-border link inset-delimiter dense :class="'text-' + color">
        <q-list-header align="center">
          <div class="row">
            <div class="col-12">
              <img src="../assets/logo-alliance01.png" width="100%">
            </div>
          </div>
        </q-list-header>
        <q-list-header>Itens</q-list-header>
        <q-item to="/studies" exact>
          <q-item-side :class="'text-' + color" icon="home"/>
          <q-item-main label="Work List"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-layout-drawer
      v-model="rightMenu"
      side="right"
      :content-class="['text-' + color, 'q-pa-sm']"
      :overlay="true"
    >
      <q-list no-border link inset-delimiter dense>
        <q-list no-border link inset-delimiter>
          <q-item @click.native="logout">
            <q-item-side :class="'text-' + color" icon="exit_to_app"/>
            <q-item-main label="Logout" sublabel="Sair do sistema"></q-item-main>
          </q-item>

          <q-item>
            <q-item-main label="Cores" sublabel="Selecione a cor">
              <div class="row">
                <div class="col-4 q-pt-sm">
                  <q-btn color="primary" @click.native="setColor('primary')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="secondary" @click.native="setColor('secondary')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="info" @click.native="setColor('info')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="dark" @click.native="setColor('dark')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="positive" @click.native="setColor('positive')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="negative" @click.native="setColor('negative')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="deep-purple" @click.native="setColor('deep-purple')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="indigo" @click.native="setColor('indigo')"></q-btn>
                </div>
                <div class="col-4 q-pt-sm">
                  <q-btn color="deep-orange-7" @click.native="setColor('deep-orange-7')"></q-btn>
                </div>
                <!-- <div class="col-10 q-pt-sm">
                    <q-color-picker v-model="colorHex" />
                    
                </div>-->
              </div>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main label="Glossy" sublabel="Selecione">
              <q-toggle
                v-model="glossyToogle"
                :color="color"
                @click.native="setGlossy(glossyToogle)"
              />
            </q-item-main>
            <q-item-main label="Menu" sublabel="Menu fixado">
              <q-toggle v-model="fixedMenu" :color="color"/>
            </q-item-main>
            <q-item-main label="Darken" sublabel="Fundo escuro">
              <q-toggle v-model="dark" :color="color" @click.native="changeBG()"/>
            </q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-layout-footer>
      <q-toolbar :color="color" :glossy="glossy">
        <div class="row">
          <div class="row absolute-right">
            <span>
              <a href="http://www.wtt.com.br" target="_blank">
                <img class="q-mt-sm" src="../assets/icon-footer-right.png" width="100%" alt="ALT">
              </a>
            </span>
            <span class="q-mt-md q-ml-sm">technology for life | © Todos os direitos reservados.</span>
          </div>
        </div>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LayoutDefault",
  data() {
    return {
      colorHex: "",
      leftMenu: false,
      rightMenu: false,
      glossyToogle: this.$store.getters.getGlossy,
      fixedMenu: false,
      dark: this.$store.getters.getDarken,
      appVersion: "1.0"
    };
  },

  methods: {
    ...mapActions(["setColor", "setDarken", "setGlossy"]),

    logout() {
      this.$router.push("/");
    },
    changeBG() {
      this.setDarken(this.dark);
      let body = document.getElementById("body");
      let classList = body.classList;
      if (this.dark) {
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
  },

  computed: {
    ...mapGetters({
      color: "getColor",
      glossy: "getGlossy"
    })
  },
  beforeMount() {
    this.changeBG();
  }
};
</script>
