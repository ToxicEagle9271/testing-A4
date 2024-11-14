<template> 
  <nav class="navbar navbar-expand-lg navbar-custom">
    <span class="navbar-brand">Subscriptions</span>
    <ul class="nav justify-content-center">
      <li class="nav-item" v-if="loggedIn === 'false'">
        <a class="nav-link" @click="register">Register</a>
      </li>
      <li class="nav-item" v-if="loggedIn === 'true'">
        <a class="nav-link" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'Navbar',
  data() {
    return {
      loggedIn: 'false',
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  updated() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.loggedIn = firebase.auth().currentUser ? 'true' : 'false';
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggedIn = 'false';
          this.$router.push('/');
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push('/');
        });
    },
    register() {
      this.$router.push('/register');
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

.navbar-custom {
  background-color: #44515e;
  padding: 0.5em;
}

.navbar-brand {
  color: #42B883;
}

.nav-link {
  color: black;
  padding: 0.5em;

  &.router-link-exact-active {
    color: #08492c;
  }
}
</style>
