<template>
  <div>
    <navbar :loggedIn="loggedIn" @logging="loggedIn = $event" ref="childRef"></navbar>
    <login
      v-if="!loggedIn && !registerForm"
      @regTrue="registerForm = $event"
      @logging="loggedIn = $event"
      :loggedIn="loggedIn"
    ></login>
    <register
      v-if="!loggedIn && registerForm"
      @regTrue="registerForm = $event"
      @logging="loggedIn = $event"
      :loggedIn="loggedIn"
    ></register>
    <p class="errorMsg" v-if="isError">{{ errorMessage }}</p>
    <div class="container" id="kanbanBoard" v-if="loggedIn">
      <board 
        v-for="(board, index) in boardsList" 
        :key="index" 
        :board="board"
        @sendErr="errMsg = $event, errorToggler()"
      ></board>
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
      registerForm: false,
      loginForm: true,
      errMsg: '',
      isError: false,
      errorMessage: '',
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
          for (let arr of this.boardsList) {
            arr.data = [];
            for (let data of datas.data) {
              if (data.category === arr.name) {
                arr.data.push(data);
              }
            }
          }
          this.$refs.childRef.login();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    errorToggler(){
      this.isError = true
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
  },
  watch:{
    isError(newVal,oldVal){
      if(newVal) this.errorMessage = this.errMsg
      if(oldVal) this.errorMessage = 'Ini oldVal'
    },
    errorMessage(newVal){
      if(newVal){
        setTimeout(()=>{
          this.errorMessage = '',
          this.isError = false
        }, 2000)
      }
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
.credit {
  color: aliceblue;
  position: fixed;
  bottom: 0;
  left: 0;
}
.errorMsg{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fredoka One", cursive;
  margin: 1rem;
  background-color: red;
}
</style>