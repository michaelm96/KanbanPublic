<template>
  <div class="register-container">
    <div class="registerForm">
      <div class="registerTitle">
        <h1>Register</h1>
      </div>
      <form @submit.prevent="login">
        <div class="input">
          <label for="first_name">First Name:</label>
        </div>
        <div class="fieldInput">
          <input type="text" name="first_name" id="firstName" placeholder="Henry" v-model="first_name"/>
        </div>
        <div class="input">
          <label for="last_name">Last Name:</label>
        </div>
        <div class="fieldInput">
          <input type="text" name="Last_name" id="LastName" placeholder="Arthur" v-model="last_name"/>
        </div>
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
        </div>
        <br>
        <div class="goToLogin">
          <a href="" @click.prevent="callLogin">Already have an account? Go to Login</a>
        </div>
        <button class="button" type="submit" value="submit">Register</button>
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
      first_name: "",
      last_name: ""
    };
  },
  methods: {
    login() {
        // console.log(this.first_name,this.last_name)
      axios
        .post("http://localhost:3000/register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem("access_token", res.data.access_token);
          this.loginlogin = true;
          this.callLogin();
        })
        .catch(err => {
          console.log(err);
        });
    },
    callLogin() {
      this.$emit("regTrue", false);
    }
  }
};
</script>


<style scoped>
.register-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30rem;
}
.registerForm {
  border: turquoise solid 5px;
  font-family: "Fredoka One", cursive;
  color: burlywood;
  text-shadow: 2px 2px black;
  background-color: skyblue;
}
.registerTitle {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 0rem;
  margin-bottom: 3rem;
}
input[type="email"],
input[type="password"],
input[type="text"] {
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
  margin: 0.5rem 6rem 1rem 6rem;
  text-shadow: 2px 2px black;
}
.fieldInput {
  margin: 0.5rem 6rem 0.5rem 6rem;
}

.passwordInput {
  margin: 1rem 2rem 2rem 2rem;
}

.goToLogin {
  margin: 0rem 2rem 1.5rem 2rem;
}
.goToLogin a{
  text-decoration: none;
  text-shadow: none;
}
</style>