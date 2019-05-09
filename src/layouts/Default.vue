<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="light-green-8" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftMenu = !leftMenu" aria-label="Menu" icon="menu"/>

        <q-toolbar-title>CLÍNICA MODELO II - MEDICINA DIAGNÓSTICA</q-toolbar-title>
        <q-btn flat dense round left @click="rightMenu = !rightMenu" aria-label="Menu" icon="menu"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftMenu"
      content-class="bg-grey-3"
      :content-style="{padding: '20px'}"
      side="left"
    >
      <q-list no-border link inset-delimiter>
        <q-list no-border link inset-delimiter>
          <q-list-header>Navigation</q-list-header>
          <q-item to="/" exact>
            <q-item-side icon="home"/>
            <q-item-main label="Home"/>
          </q-item>
          <q-item to="/about">
            <q-item-side icon="info_outline"/>
            <q-item-main label="About"/>
          </q-item>

          <q-item-separator/>
          <q-list-header>Essential Links</q-list-header>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side icon="school"/>
            <q-item-main label="Docs" sublabel="quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
            <q-item-side icon="chat"/>
            <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('http://forum.quasar-framework.org')">
            <q-item-side icon="forum"/>
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://twitter.com/quasarframework')">
            <q-item-side icon="rss feed"/>
            <q-item-main label="Twitter" sublabel="@quasarframework"></q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>
    <q-layout-drawer
      v-model="rightMenu"
      side="right"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :overlay="true"
    >
      <q-list no-border link inset-delimiter>
        <q-list no-border link inset-delimiter>
          
          <q-item @click.native="logout">
            <q-item-side icon="power_settings_new"/>
            <q-item-main label="Logout" sublabel="Sair do sistema"></q-item-main>
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
      rightMenu: false
    }
  },
  methods: {
    openURL,
    logout(){
      this.$router.push('/')
    }
  },
  beforeMount() {
    
  }
};
</script>

<style></style>
