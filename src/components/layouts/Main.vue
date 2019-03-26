<template>
  <div id="app">
    <ul class="nav">
      <h4 class="title">{{ projectName }}</h4>
      <li>
        <router-link :to="{name:'home'}">Home</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'project' }">Project</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'signup' }">SignUp</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'logout' }">Logout</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      projectName: "Home"
    };
  },
  computed: {
    loggedIn() {
      this.projectName = this.$store.getters.getProjectName;
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.title {
  margin-right: auto;
  margin-left: 20px;
  margin-top: 10px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  list-style: none;
  padding: 9px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgrey;
  position: fixed;
  width: 100%;
}
.nav a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>