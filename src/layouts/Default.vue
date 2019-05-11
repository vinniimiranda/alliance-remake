<template>
  <q-layout  view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar :color="color" :glossy="glossy" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftMenu = !leftMenu" aria-label="Menu" icon="menu"/>

        <q-toolbar-title>CLÍNICA MODELO II - MEDICINA DIAGNÓSTICA</q-toolbar-title>
        <q-btn flat dense round left @click="rightMenu = !rightMenu" aria-label="Menu" icon="menu"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer 
      v-model="leftMenu"
      :content-class="['text-' + color , 'q-pa-sm']"
      side="left"
      :overlay="fixedMenu"
    >
      <q-list no-border link inset-delimiter dense  :class="'text-'+ color">
       
          <q-list-header align="center">
              <img src="../assets/logo-alliance01.png" class="logoLogin">
          </q-list-header>
          <q-list-header>Itens</q-list-header>
          <q-item to="/system" exact >
            <q-item-side :class="'text-'+ color"  icon="home"/>
            <q-item-main label="Home"/>
          </q-item>
          <!-- <q-item to="/about">
            <q-item-side  :class="'text-'+ color" icon="info_outline"/>
            <q-item-main label="About"/>
          </q-item> -->

     
          
        
      </q-list>
    </q-layout-drawer>
    <q-layout-drawer
      v-model="rightMenu"
      side="right"
      :content-class="['text-' + color , 'q-pa-sm']"
      :overlay="true"
    >
      <q-list no-border link inset-delimiter dense>
        <q-list no-border link inset-delimiter>
          <q-item @click.native="logout">
            <q-item-side :class="'text-'+ color" icon="power_settings_new"/>
            <q-item-main label="Logout" sublabel="Sair do sistema"></q-item-main>
          </q-item>

          <q-item>
            
            <q-item-main label="Color" sublabel="Selecione a cor">
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
              </div>
            </q-item-main>
          </q-item>
          <q-item>
           
            <q-item-main label="Glossy" sublabel="Selecione">
              <q-toggle v-model="glossyToogle" @click.native="setGlossy()" />
            </q-item-main>
            <q-item-main label="Menu" sublabel="Menu fixado">
              <q-toggle v-model="fixedMenu"  />
            </q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftMenu: false,
      rightMenu: false,
      glossyToogle: true,
      fixedMenu: false,
    };
  },
  methods: {
    openURL,
    logout() {
      this.$router.push("/");
    },
    setColor(color) {
      this.$store.dispatch("setColor", color)
    },
    setGlossy(){
     this.$store.dispatch('setGlossy', this.glossyToogle)
    }
  },

  computed: {
    color() {
      return this.$store.getters.getColor
    },
    glossy() {
      return this.$store.getters.getGlossy
    }
  },
  beforeMount() {}
};
</script>

<style>
.logoLogin{
width: 100%;
}
</style>
