<template>
  <div id="app">
    <tictacheader header-text="Tic Tac Toe"></tictacheader>
    <router-view/>
    <tictacfooter footer-text="A Vue.js Project by Chad D. Owens"></tictacfooter>
  </div>
</template>

<script>
import tictacheader from './components/layout/TicTacHeader'
import tictacfooter from './components/layout/TicTacFooter'

export default {
  name: 'App',
  components: {
    tictacheader,
    tictacfooter
  }
}
</script>

<style>
  body {
    background-color: #c7f9cc;
    color: white;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
