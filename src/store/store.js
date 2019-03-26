import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:4000'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('auth-token') || null,
    username: localStorage.getItem('username') || null,
    project: localStorage.getItem('project') || null,
    socket: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    getProjectName(state) {
      if (state.project !== null) {
        return state.project;
      }
      return "";
    },
    getUserName(state) {
      if (state.username !== null) {
        return state.username;
      }
      return "";
    }
  },
  mutations: {
    retrieveToken(state, {
      token,
      username,
      project
    }) {
      state.token = token;
      state.username = username;
      state.project = project
    },
    destroyToken(state) {
      state.token = null;
      state.username = "";
      state.project = "";
    }
  },
  actions: {
    deletePost(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.delete('/deletePost/' + id).then(res => {
          resolve(res.data)
        }).catch(rej => {
          reject(rej)
        })
      })
    },
    createNewPost(context, postData) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/createPost', {
          text: postData.text
        }).then(res => {
          resolve(res.data)
        }).catch(rej => {
          reject(rej)
        })
      })
    },
    getPostsInProject(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/getPosts').then(res => {
          resolve(res.data)
        }).catch(rej => {
          reject(rej)
        })
      })
    },
    signup(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/signup', {
            username: data.username,
            email: data.email,
            project: data.project,
            password: data.password
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    logOut(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('auth-token')
              localStorage.removeItem('username')
              localStorage.removeItem('project')
              context.commit('destroyToken')

              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('auth-token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    logIn(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
            email: credentials.email,
            password: credentials.password,
          })
          .then(response => {
            const token = response.data.token

            localStorage.setItem('auth-token', token)
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('project', response.data.user.project)
            context.commit('retrieveToken', {
              token,
              ...response.data.user
            })

            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
})
