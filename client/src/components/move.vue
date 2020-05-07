<template>
  <div class="arrow">
    <div class="triangle"></div>
    <ul class="list">
      <li @click="newCategory('Backlog')" id="li1">Backlog</li>
      <li @click="newCategory('To-Do')" id="li2">To-Do</li>
      <li @click="newCategory('Done')" id="li3">Done</li>
      <li @click="newCategory('Completed')" id="li4">Completed</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "move",
    methods: {
        newCategory(value){
            this.$emit('chosen', value)
        }
    }
};
</script>

<style scoped>
.arrow {
  display: flex;
  flex-direction: column;
}
.list{
    padding-left: 1rem;
    list-style: none;
    border: #888 solid 3px;
    margin: 0 1rem 0 1rem;
    cursor: pointer;
}

#li1 {
  color: firebrick;
}

#li2 {
  color: darkkhaki;
}

#li3 {
  color: cornflowerblue;
}
#li4 {
  color: darkseagreen;
}

.triangle{
    width: 1rem;
    align-self: flex-end;
    border-width: 1rem 0 1rem 1rem;
    border-color: transparent transparent #888 transparent;
    border-style: solid;
    margin-top: -1.5rem;
    margin-right: 5rem;
}
</style>