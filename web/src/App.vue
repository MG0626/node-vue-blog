<template>
  <v-app>
    <nav-bar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
import NavBar from './components/navbar/NavBar';
import FooterBar from './components/footerbar/FooterBar';

export default {
  name: 'App',

  components: {
    NavBar,
    FooterBar
  },
  mounted () {
  },

  
};
</script>

