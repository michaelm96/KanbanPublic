<template>
  <div class="board">
    <div :class="board.id" class="title">{{ board.name }}</div>
    <div class="taskBoard">
      <box v-for="(card, index) in board.data" :key="index" :card="card" @errMessage="err=$event, sendErr()"></box>
    </div>
    <form class="boxSizing">
      <textarea
        name="addCard"
        class="addCard"
        placeholder="Add New Card"
        :rows="rowSize"
        v-model="textField"
        @input="enlarge"
        @keydown.enter.prevent="postTask"
      ></textarea>
    </form>
  </div>
</template>

<script>
import box from "../components/box";
import axios from "axios"

export default {
  name: "board",
  props: ["board"],
  data() {
    return {
      rowSize: 1,
      textField: "",
      err: ""
    };
  },
  components: {
    box
  },
  methods: {
    enlarge() {
      if (this.textField === "") {
        this.rowSize = 1;
      } else {
        this.rowSize = 3;
      }
    },
    postTask() {
      const access_token = localStorage.getItem("access_token");
      const title = this.textField
      const category = this.board.name
      return axios({
        method : "POST",
        url : "https://kanban-h8.herokuapp.com/task",
        headers : {
          access_token
        },
        data : {
          title,
          category
        },  
      })
      .then(data => {
        this.textField = ""
        this.rowSize = 1
        this.$parent.getData()
      })
      .catch(err => {
        this.$emit("sendErr", err.response.data.message)
      })
    },
    sendErr(){
      this.$emit("sendErr", this.err)
    }
  }
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  border: #333 none 2px;
  height: max-content;
  font-size: large;
  font-weight: bold;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
}

.board1 {
  background-color: firebrick;
}

.board2 {
  background-color: darkkhaki;
}

.board3 {
  background-color: cornflowerblue;
}
.board4 {
  background-color: darkseagreen;
}

.title {
  padding-left: 0.5rem;
  color: white;
  border-radius: 10px 10px 0 0;
}

.taskBoard {
  max-height: 75vh;
  overflow: auto;
  background-color: aqua;
}
.addCard {
  width: 100%;
  border: none;
  margin: 0 auto;
  padding: 5px;
  border-radius: 10px;
  min-height: 1.7rem;
}
.boxSizing {
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}
</style>