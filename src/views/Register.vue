<template>
  <div class="app">
    <Navbar />
    <form @submit.prevent="register" class="register-form">
      <h2>Register</h2>
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
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Register</button>
        <button type="button" class="btn btn-secondary" @click="cancelOperation">
          Back to Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Register',
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
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('Successfully registered! Please login.');
          this.$router.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    cancelOperation() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.register-form {
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
  margin-top: 1rem;
}

.btn-secondary {
  width: 100%;
  margin-top: 1rem;
}
</style>
