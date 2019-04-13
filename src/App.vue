<template>
<v-app>
  <Header />
  <v-content class="mt-1">
    <v-container grid-list-md pa-1>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/Header'


export default {
  name: 'App',
  components: {
    Header
  }

}
</script>
<style media="screen">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all .8s ease;
}

/* .fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
} */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
