<template> 
  <div class="app">
    <main>
      <router-view class="modify"></router-view>
    </main>
  </div>
</template>

<script>
// No additional script is needed here as this component serves as a layout wrapper.
export default {
  name: 'AppLayout',
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
