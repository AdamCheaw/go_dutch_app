<template lang="html">
  <v-layout row wrap>
    <v-flex offset-md2 md8 xs12>
      <div class="text-xs-center" style="height:250px;margin-top:10%;">
        <v-btn color="secondary" @click="googleLogin" class="white--text" large dark>
          <v-icon left white>
            fab fa-google
          </v-icon>

          請使用 google 帳戶登入
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase';
import router from '../router'
var provider = new firebase.auth.GoogleAuthProvider();
export default {

  methods: {
    googleLogin() {
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log("Token :");
          console.log(token);
          console.log("User :");
          console.log(user);
          router.push({ path: "/" });
          //this.$router.push('/')
        })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
