<template>
  <div class="app">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Update Subscription</h3>
        <form @submit.prevent="onUpdateForm">
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
              @click="updateSubscription"
            >
              Update Subscription
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
  name: 'EditSubscription',
  components: {
    Navbar,
  },
  data() {
    return {
      subscription: {},
    };
  },
  created() {
    const dbRef = db.collection('subscriptions').doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.subscription = doc.data();
        } else {
          alert('No such subscription found!');
          this.$router.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error accessing database');
        this.$router.push('/');
      });
  },
  methods: {
    onUpdateForm() {
      db.collection('subscriptions')
        .doc(this.$route.params.id)
        .update(this.subscription)
        .then(() => {
          this.$router.push('/subscriptionsList');
        })
        .catch((error) => {
          console.log(error);
          alert('Error updating subscription');
          this.$router.push('/subscriptionsList');
        });
    },
    cancelOperation() {
      this.$router.push('/subscriptionsList');
    },
    updateSubscription() {
      db.collection('subscriptions')
        .doc(this.$route.params.id)
        .update(this.subscription)
        .then(() => {
          this.$router.push('/subscriptionsList');
        })
        .catch((error) => {
          console.log(error);
          alert('Error updating subscription');
          this.$router.push('/subscriptionsList');
        });
    },
  },
};
</script>

<style lang="scss">
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
