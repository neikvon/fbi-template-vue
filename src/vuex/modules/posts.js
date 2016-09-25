import api from '../../api'

const state = {
  all: [],
  allFailure: '',
  post: {}
}

const mutations = {
  GET_POSTS(state, { posts }) {
    state.all = posts
  },
  GET_POSTS_FAILURE(state, { error }) {
    state.allFailure = error
  },
  GET_POST(state, { id }) {
    state.post = state.all.find(p => p.id === id)
  }
}

const actions = {
  getPosts({commit}) {
    api.getPosts(posts => {
      commit('GET_POSTS', { posts })
    })
  },
  getPostById({commit}, id) {
    setTimeout(() => {
      commit('GET_POST', { id })
    }, 200)
  },

  // use vue-resource
  // getPosts({commit}) {
  //   return api.getPosts()
  //     .then((response) => store.dispatch(GET_POSTS, response))
  //     .catch((error) => store.dispatch(GET_POSTS_FAILURE, error));
  // }
}

export default {
  state,
  actions,
  mutations
};