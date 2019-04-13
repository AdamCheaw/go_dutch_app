import './firebase'
import firebase from 'firebase'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueFire from 'vuefire'
import router from './router'
import store from './store';

Vue.config.productionTip = false
Vue.use(VueFire)

let app;
firebase.auth().onAuthStateChanged(function(user) {
  if(!app) {
    new Vue({
      render: h => h(App),
      router: router,
      store: store
    }).$mount('#app')
  }
});
// new Vue({
//   render: h => h(App),
//   router: router,
//   store: store
// }).$mount('#app')