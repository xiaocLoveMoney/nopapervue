<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from './components/home/template.vue';

export default {
  components: {
    Login,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>