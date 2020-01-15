<template>
  <section>
    <div class="home-page">
      <b-button 
        tag="router-link"
        to="/sign-up"
        type="is-link"
        size="is-large"
      >
        Cadastre-se
      </b-button>
    </div>
  </section>
</template>

<script>

export default {
  name: 'home',
}
</script>

<style lang="scss">
  .home-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
