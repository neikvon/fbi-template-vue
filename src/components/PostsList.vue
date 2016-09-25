<style scoped>
  .posts-list {
    li {
      list-style-type: none;
    }
    .num {
      display: inline-block;
      width: 30px;
    }
  }
</style>

<template>
  <ul class="posts-list">
    <li v-for="(post, index) of allPosts">
      <span class="num">{{index+1}}.</span>
      <router-link :to="{ name: 'post', params: { id: post.id } }">
        {{ post.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['allPosts'])
    },
    methods: mapActions(['getPosts']),
    created() {
      this.getPosts();
    }
  }
</script>