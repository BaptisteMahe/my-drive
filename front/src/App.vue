<template>
  <div class="drive-app">
    <img alt="Logo" src="./assets/logo.png" />
    <Upload />
    <div class="file-list" v-if="fileArray.length > 0">
      <File v-for="file in fileArray" :key="file" v-bind:fileName="file" />
    </div>
    <div v-else class="empty-file-list">There is no files in your drive</div>
  </div>
</template>

<script>
import File from "./components/File";
import Upload from "./components/Upload";

export default {
  name: "App",
  components: {
    Upload,
    File,
  },
  data() {
    return {
      fileArray: [
        "doc.txt",
        "lol.pdf",
        "attention.exe",
        "object.json",
        "helloWorld.py",
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.empty-file-list {
  color: red;
  font-size: 1.5em;
  font-weight: bold;
}
</style>
