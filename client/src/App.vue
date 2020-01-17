<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="loading" />
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
}
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
