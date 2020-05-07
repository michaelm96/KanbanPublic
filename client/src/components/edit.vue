<template>
  <div class="arrow">
    <div class="triangle"></div>
    <textarea name="editCard" class="editCard" @keydown.enter.prevent="updateTask" v-model="editValue"></textarea>
  </div>
</template>

<script>
export default {
  name: "edit",
  props: ['card'],
  data(){
      return{
          editValue : this.card.title
      }
  },
  methods: {
      updateTask(){
          this.$emit('newTitle', this.editValue)
      }
  }
};
</script>

<style scoped>
.arrow {
  display: flex;
  flex-direction: column;
}

.triangle{
    width: 1rem;
    align-self: flex-end;
    border-width: 1rem 0 1rem 1rem;
    border-color: transparent transparent #888 transparent;
    border-style: solid;
    margin-top: -1.5rem;
    margin-right: 3.7rem;
}
</style>