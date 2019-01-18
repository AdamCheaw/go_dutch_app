<template>
  <v-app>
    <Header/>
    <v-content class="mt-1">
      <v-container grid-list-md pa-1>
        <router-view></router-view>
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
