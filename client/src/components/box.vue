<template>
  <div>
    <div class="box" draggable="true">
      <p>{{ card.title }}</p>
      <div class="date">
        <p>By: {{ by }}</p>
        <p>{{ new Date(card.createdAt).toDateString().slice(4).split(" ").join("-") }}</p>
      </div>
      <div class="right">
        <i class="fas fa-arrows-alt move icon" @click="move"></i>
        <i class="fas fa-edit edit icon" @click="showEdit"></i>
        <i class="fas fa-eraser delete icon" @click="deleteTask"></i>
      </div>
    </div>
    <move v-if="movePressed" @chosen="category = $event, editTask(), move()"></move>
    <edit v-if="editPressed" :card="this.card" @newTitle="title = $event, editTask(), showEdit()"></edit>
  </div>
</template>

<script>
import axios from "axios";
import move from "./move";
import edit from "./edit";

export default {
  name: "box",
  props: ["card"],
  data() {
    return {
      access_token: localStorage.getItem("access_token"),
      movePressed: false,
      editPressed: false,
      category: this.card.category,
      title: this.card.title,
      by: `${this.card.User.first_name} ${this.card.User.last_name}`
    };
  },
  methods: {
    deleteTask() {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "Delete",
        url: `https://kanban-h8.herokuapp.com/task/${this.card.id}`,
        headers: {
          access_token: this.access_token
        }
      })
        .then(res => {
          this.$parent.$parent.getData();
        })
        .catch(err => {
					this.$emit("errMessage", err.response.data.message)
        });
    },
    editTask() {
      const access_token = localStorage.getItem("access_token");
      const { id } = this.card;
      axios({
        method: "PUT",
        url: `https://kanban-h8.herokuapp.com/task/${id}`,
        headers: {
          access_token
        },
        data: {
          title: this.title,
          category: this.category
        }
      })
        .then(data => {
          this.$parent.$parent.getData();
          this.category = "";
        })
        .catch(err => {
					this.$emit("errMessage", err.response.data.message)
        });
    },
    move() {
      if (this.movePressed) {
        this.movePressed = false;
      } else {
        this.movePressed = true;
        this.editPressed = false;
      }
    },
    showEdit() {
      if (this.editPressed) {
        this.editPressed = false;
      } else {
        this.editPressed = true;
        this.movePressed = false;
      }
    }
  },
  components: {
    move,
    edit
  }
};
</script>

<style scoped>
.box {
  border: #888 solid 3px;
  margin: 10px 10px;
  padding: 0px 10px;
  font-weight: 100;
  border-radius: 8px;
	background-color: snow;
	font-family: 'Acme', sans-serif;
}

p {
  margin: 0px 0px;
  font-size: 1.2rem;
}

.right {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.delete {
  color: #bf1000;
}

.edit {
  color: #13bf00;
}

.move {
  color: #00c1cf;
}

.icon {
  margin-right: 0.2rem;
}

.date p {
  opacity: 0.6;
  font-size: 12px;
}
</style>