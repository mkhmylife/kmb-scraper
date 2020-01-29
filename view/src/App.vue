<template>
  <div id="app">
    <eta
      number="307"
      from="大埔中心"
      to="中環渡輪碼頭"
      eta-stop="大埔中心總站"
    ></eta>
    <eta
      number="271"
      from="富亨"
      to="佐敦(西九龍站)"
      eta-stop="大埔中心總站"
    ></eta>
  </div>
</template>

<script>
import Eta from "./components/Eta";

export default {
  name: "app",
  components: {
    Eta
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap");

body,
html {
  font-family: "Noto Sans JP", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
