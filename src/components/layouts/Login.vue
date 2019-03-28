<template>
  <div class="login-wrapper">
    <div class="login-left">
      <img height="400" alt="application logo" src="../../assets/logo.png">
    </div>
    <form action="#" class="login-right" @submit.prevent="login">
      <h4>Login</h4>
      <div class="form-group">
        <input type="text" id="email" placeholder="email" v-model="email" required>
        <label for="email">Email</label>
      </div>
      <div class="form-group">
        <input type="password" id="Password" placeholder="Password" v-model="password" required>
        <label for="Password">Password</label>
      </div>
      <div class="button-area">
        <button type="submit" class="btn btn-primary pull-right">Login</button>
      </div>
      <div v-if="error" class="text-error">{{error}}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("logIn", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "project" });
        })
        .catch(error => {
          this.error = error.data;
        });
    }
  }
};
</script>
<style>
input {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  font-size: 16px;
  color: #000;
  border-radius: 0;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #aaaaaa;
}

::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.00933333em;
}
.text-error {
  color: red;
}
.form-group {
  position: relative;
  padding-top: 15px;
  margin-top: 10px;
}

label {
  position: absolute;
  top: 0;
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  color: #aaa;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.00933333em;
  transition: all 0.2s ease-out;
}

input:placeholder-shown + label {
  opacity: 0;
  -webkit-transform: translateY(15px);
  transform: translateY(15px);
}

.login-wrapper {
  padding: 24px;
  height: 440px;
  display: flex;
  justify-content: space-around;
}

.login-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-right {
  margin-top: 48px;
  padding: 24px;
  width: 400px;
}

.checkbox-container {
  display: flex;
  margin-top: 35px;
}

.text-checkbox {
  color: #aaa;
  font-size: 16px;
  letter-spacing: -0.00933333em;
  font-weight: 300;
  margin-left: 15px;
}

input[type="checkbox"] {
  cursor: pointer;
  margin: 0;
  height: 22px;
  position: relative;
  width: 22px;
  -webkit-appearance: none;
  transition: all 180ms linear;
}

input[type="checkbox"]:before {
  border: 1px solid #aaa;
  background-color: #fff;
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 2px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:before {
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  border: 1px solid #22bf64;
}

input[type="checkbox"]:after {
  content: "";
  border: 2px solid #fff;
  border-right: 0;
  border-top: 0;
  display: block;
  height: 4px;
  left: 4px;
  opacity: 0;
  position: absolute;
  top: 6px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 12px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:after {
  opacity: 1;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>

