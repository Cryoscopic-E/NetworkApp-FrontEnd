import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://na-backend-server.herokuapp.com'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('auth-token') || null,
    username: localStorage.getItem('username') || null,
    project: localStorage.getItem('project') || null,
    avatar: localStorage.getItem('avatar') || null,
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
    },
    getAvatar(state) {
      if (state.avatar !== null) {
        return state.avatar
      }
      return null
    }
  },
  mutations: {
    retrieveToken(state, {
      token,
      username,
      project,
      avatar
    }) {
      state.token = token;
      state.username = username;
      state.project = project
      state.avatar = avatar
    },
    destroyToken(state) {
      state.token = null;
      state.username = "";
      state.project = "";
      state.avatar = null;
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

      let data = new FormData()
      data.append('image', postData.image)
      data.append('text', postData.text)

      return new Promise((resolve, reject) => {
        axios.post('/createPost', data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
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
        let userData = new FormData()
        userData.append('username', data.username)
        userData.append('avatar', data.avatar)
        userData.append('email', data.email)
        userData.append('project', data.project)
        userData.append('password', data.password)
        axios.post('/signup', userData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
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
              localStorage.removeItem('avatar')
              context.commit('destroyToken')

              resolve(response)
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

            localStorage.setItem('avatar', response.data.user.avatar)

            context.commit('retrieveToken', {
              token: token,
              username: response.data.user.username,
              project: response.data.user.project,
              avatar: response.data.user.avatar
            })
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  }
})
