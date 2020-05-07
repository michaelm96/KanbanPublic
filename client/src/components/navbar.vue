<template>
  <nav class="navContainer">
    <h3 class="kanban">Kanban</h3>
    <ul class="navBar">
        <li class="logButton" @click.prevent="login(true)" v-if="loggedInNav">
            Logout
            <i class="fas fa-sign-out-alt"></i>
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["loggedIn"],
  data(){
      return{
          loggedInNav : this.loggedIn,
      }
  },
  methods:{
      login(status){
          if(status){
              localStorage.removeItem('access_token')
              this.loggedInNav = false
          }else{
              this.loggedInNav = true
          }
          this.$emit('logging', this.loggedInNav)
      }
  }
};
</script>


<style scoped>
.navContainer {
  background-image: linear-gradient(to right, red, yellow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0px 0px 10px 10px;
}
.kanban {
  margin-left: 1rem;
  font-family: "Fredoka One", cursive;
  font-size: 20px;
  color: turquoise;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.navBar {
  list-style: none;
  margin-right: 2rem;
  margin-top: 1rem;
  display: inline-flex;
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
  font-family: "Fredoka One", cursive;
  color: blueviolet;
}
.logButton{
  padding-bottom: 1rem;
}
</style>