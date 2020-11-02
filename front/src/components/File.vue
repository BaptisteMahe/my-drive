<template>
  <div class="box">
    <div class="title">{{ fileName }}</div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    fileName: String,
  },
};
</script>

<style>
.box {
  margin: 10px;
  width: 20%;
  height: 10vh;

  border-style: solid;
  border-radius: 10px;
  font-size: 1.2em;

  display: flex;
  align-items: center;
  justify-content: center;
}
.box:hover {
  background-color: rgb(44, 62, 80, 0.1);
}
</style>