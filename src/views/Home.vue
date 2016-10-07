<style>
  .logo {
    width: 120px;
  }

  .bottom {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 20px;
  }
</style>

<template>
  <section class="page">
    <div>
      <img :src="logo" class="logo">
    </div>
    <h2>
      This is Home
      <br>
      API Root: {{ __APIROOT__ }}
    </h2>
    <img-list class="bottom"></img-list>
  </section>
</template>

<script>
  import ImgList from 'components/ImgList'

  export default {
    components: {
      ImgList
    },
    data() {
      return {
        logo: require('../static/img/logo.png')
      }
    }
  }
</script>