<template>
  <div class="login-container">
    <div class="loginForm">
      <div class="loginTitle">
        <h1>Login</h1>
      </div>
      <p class="invalid">{{ errMessage }}</p>
      <form @submit.prevent="login">
        <div class="input">
          <label for="email">Email:</label>
        </div>
        <div class="fieldInput">
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="HenryArthur@email.com"
          />
        </div>
        <div class="input">
          <label for="password">Password:</label>
        </div>
        <div class="fieldInput">
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            placeholder="********"
          />
          <br />
        </div>
        <div class="goToRegister">
          <a href @click.prevent="callRegis" style="color: red">Don't have account yet? register</a>
        </div>
        <button class="button" type="submit" value="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["loggedIn"],
  data() {
    return {
      email: "",
      password: "",
      loginlogin: this.loggedIn,
      errMessage: ""
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          this.loginlogin = true;
          this.$parent.getData();
          this.$emit("logging", this.loginlogin);
        })
        .catch(err => {
          this.errMessage = err.response.data.message;
        });
    },
    callRegis() {
      this.$emit("regTrue", true);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30rem;
}
.loginForm {
  border: turquoise solid 5px;
  font-family: "Fredoka One", cursive;
  color: burlywood;
  background-color: skyblue;
}
.loginTitle {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 5rem 3rem 5rem;
}
input[type="email"],
input[type="password"] {
  border: none;
  border-bottom: white solid 3px;
  background-color: transparent;
}

.button {
  display: flex;
  padding: 15px 25px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #006ecf;
  border: none;
  border-radius: 15px;
  margin: 0 auto;
}

.button:hover {
  background-color: #3e8e41;
}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.input {
  margin: 1rem 6rem 2rem 6rem;
  text-shadow: 2px 2px black;
}
.fieldInput {
  margin: 1rem 6rem 2rem 6rem;
  background-color: transparent;
}

.goToRegister {
  margin: 1rem 4rem 5rem 4rem;
}
.goToRegister a {
  text-decoration: none;
}

.invalid {
  margin-left: 5rem;
  color: brown;
  text-shadow: none;
}
</style>