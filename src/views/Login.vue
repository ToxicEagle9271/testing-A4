<template>
  <div class="app">
    <Navbar />
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Username:</label>
        <input
          type="email"
          id="email"
          placeholder="Email address..."
          v-model="email"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="pw">Password:</label>
        <input
          id="pw"
          type="password"
          placeholder="Password..."
          v-model="password"
          required
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Login',
  components: {
    Navbar,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/subscriptionsList');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.btn-primary {
  width: 100%;
}
</style>
