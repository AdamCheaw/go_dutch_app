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
      <v-toolbar-items class="hidden-xs-only">
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
    </v-toolbar>
  </div>

</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        // { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'create', title: '記錄', link: '/adding' },
        { icon: 'person', title: '個人資料', link: '/profile' }
        // { icon: 'face', title: 'Sign up', link: '/signup' },
        // { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]

    }
  }
}
</script>

<style lang="css">
</style>
