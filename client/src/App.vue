<template>
  <div>
    <navbar :loggedIn="loggedIn" @logging="loggedIn = $event" ref="childRef"></navbar>
    <login v-if="!loggedIn && !registerForm" @regTrue="registerForm = $event" @logging="loggedIn = $event" :loggedIn="loggedIn"></login>
    <register v-if="!loggedIn && registerForm" @regTrue="registerForm = $event" @logging="loggedIn = $event" :loggedIn="loggedIn"></register>
    <div class="container" id="kanbanBoard" v-if="loggedIn">
      <board v-for="(board, index) in boardsList" :key="index" :board="board"></board>
    </div>
    <p class="credit">Photo by Thomas Langnes on Unsplash</p>
  </div>
</template>

<script>
import login from "./components/login";
import register from "./components/register";
import navbar from "./components/navbar";
import board from "./components/board";
import axios from "axios";

export default {
  name: "App",
  computed: {},
  data() {
    return {
      loggedIn: true,
      registerForm:false,
      loginForm:true,
      boardsList: [
        {
          name: "Backlog",
          id: "board1",
          data: []
        },
        {
          name: "To-Do",
          id: "board2",
          data: []
        },
        {
          name: "Done",
          id: "board3",
          data: []
        },
        {
          name: "Completed",
          id: "board4",
          data: []
        }
      ]
    };
  },
  methods: {
    getData() {
      const access_token = localStorage.getItem("access_token");
      axios
        .get("http://localhost:3000/task", {
          headers: {
            access_token
          }
        })
        .then(datas => {
          console.log(datas.data);
          for (let arr of this.boardsList) {
            arr.data = [];
            for (let data of datas.data) {
              if (data.category === arr.name) {
                arr.data.push(data);
              }
            }
          }
          console.log(this.boardsList);
          this.$refs.childRef.login();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    navbar,
    board,
    login,
    register
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.loggedIn = true;
      this.getData();
    } else {
      this.loggedIn = false;
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  grid-gap: 4rem;
  margin: 1rem;
}
.credit{
  color: aliceblue;
  position: fixed;
  bottom: 0;
  left: 0; 
}
</style>