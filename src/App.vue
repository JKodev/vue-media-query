<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <media-query
      v-model="showHello"
      :media-query="['sm', 'lg', 'someone']"
      :breakpoints="{
      'sm': '(max-width: 639px)',
      'md': '(max-width: 767px)',
      'lg': '(max-width: 1023px)',
      'xl': '(max-width: 1279px)'
      }"
    >
      <HelloWorld
        msg="Hello Vue in CodeSandbox!"
        v-show="showHello.sm.isValid || showHello.lg.isValid"
      />
    </media-query>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import MediaQuery from "./components/MediaQuery";

export default {
  name: "App",
  components: {
    HelloWorld,
    MediaQuery
  },
  data() {
    return {
      showHello: {
        sm: {
          isValid: false
        },
        lg: {
          isValid: false
        }
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
