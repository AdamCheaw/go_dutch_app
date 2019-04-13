<template lang="html">
  <div>
    <v-navigation-drawer
      temporary app v-model="sideNav"
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary" dense app>
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up ">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Let'GoDutch</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="isLoggedIn" class="hidden-xs-only">
        <v-btn
          flat
          class="subheading font-weight-medium"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

      </v-toolbar-items>
      <!-- //test logoutBtn -->
      <v-menu v-if="isLoggedIn" :nudge-width="50">
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on">
          <span>Logout</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
      </template>

      <v-list>
        <v-list-tile key="logout" @click="logout">
          <v-list-tile-title >登出</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- end logoutBtn -->
    </v-toolbar>
  </div>

</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        // { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'create', title: '記錄', link: '/adding' },
        { icon: 'person', title: '個人資料', link: '/profile' }
        // { icon: 'face', title: 'Sign up', link: '/signup' },
        // { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ],
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: '/login' });
        });
    }
  }
}
</script>

<style lang="css">
</style>
