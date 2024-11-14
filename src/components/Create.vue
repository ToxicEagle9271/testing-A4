<template>
  <div class="app">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Add Subscription</h3>
        <form @submit.prevent="onFormSubmit">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              v-model="subscription.name"
              required
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              v-model="subscription.description"
              required
            />
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input
              type="text"
              class="form-control"
              v-model="subscription.amount"
              required
            />
          </div>
          <div class="form-group">
            <label>Payment Frequency</label>
            <select
              id="frequency"
              class="form-control"
              v-model="subscription.frequency"
              required
            >
              <option value="weekly">Weekly</option>
              <option value="bimonthly">Bi-monthly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="biannually">Bi-annually</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div class="form-group">
            <button
              type="button"
              class="btn btn-primary btn-block"
              @click="addSubscription"
            >
              Add Subscription
            </button>
            <button
              type="button"
              class="btn btn-secondary col-4"
              @click="cancelOperation"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebaseDb';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'CreateSubscription',
  components: {
    Navbar,
  },
  data() {
    return {
      subscription: {},
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    addSubscription() {
      if (
        this.subscription.name &&
        this.subscription.description
      ) {
        db.collection('subscriptions')
          .add(this.subscription)
          .then(() => {
            this.subscription = {
              name: '',
              description: '',
              amount: '',
              frequency: '',
            };
            this.$router.push('/subscriptionsList');
          })
          .catch((error) => {
            console.error(error);
            this.error = true;
            this.errorMsg = "Error creating subscription";
          });
      } else {
        this.error = true;
        this.errorMsg = "Please fill out all required fields.";
        setTimeout(() => {
          this.error = false;
          this.errorMsg = '';
        }, 5000);
      }
    },
    cancelOperation() {
      this.$router.push('/subscriptionsList');
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.btn-block {
  width: 100%;
  margin-top: 1rem;
}
.col-4 {
  margin-top: 1rem;
}
</style>
