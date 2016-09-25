<style scoped>
  .post {
    width: 600px;
    margin: 0 auto;
  }
</style>

<template>
  <article class="post">
    <h2>{{ post.title }}</h2>
    <div>
      {{ post.content }}
    </div>
  </article>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['post'])
    },
    data() {
      return {
        post: {}
      }
    },
    created() {
      this.$store.dispatch('getPostById', this.$route.params.id)
    }
  }
</script>