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
    </h2>
    <demo></demo>
    <img-list class="bottom"></img-list>
  </section>
</template>
<script>
  import ImgList from 'components/ImgList'
  import Demo from 'components/demo'

  export default {
    components: {
      ImgList,
      Demo
    },
    data() {
      return {
        logo: require('../static/img/logo.png')
      }
    },
    created() {
      console.log(__APIROOT__)
    }
  }
</script>
