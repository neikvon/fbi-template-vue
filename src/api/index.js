import Vue from 'vue'

const posts = [
  {
    id: 1,
    title: 'article 1',
    content: 'this is article 1'
  },
  {
    id: 2,
    title: 'article 2',
    content: 'this is article 2'
  }
]

export default {
  getPosts(cb) {
    setTimeout(() => cb(posts), 100)
  }

  // use vue-resource
  // getPosts(request) {
  //   return Vue.http.get('path/to/api/posts', request)
  //     .then((response) => Promise.resolve(response.data))
  //     .catch((error) => Promise.reject(error))
  // }
}
