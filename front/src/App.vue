<template>
  <div class="drive-app">
    <div class="app-container">
      <div class="title-box">
        <div class="inner">
          <span>OvhShare</span>
        </div>
        <div class="inner">
          <span>OvhShare</span>
        </div>
      </div>
      <img class="logo" src="./assets/logo.png" />
      <Upload />
      <h1>My Library</h1>
      <div class="file-list" v-if="fileArray.length > 0">
        <File v-for="file in fileArray" :key="file" v-bind:fileName="file" />
      </div>
      <div v-else class="empty-file-list">
        There is no files in your library
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      fileArray: [],
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/graphql/fileArray",
      params: {
        query: "{fileArray}",
      },
    }).then((result) => {
      this.fileArray = result.data.data.fileArray;
    });
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.drive-app {
  min-height: 100vh;
  background-image: url("./assets/altocumulus.jpg");
  background-size: cover;
}

.app-container {
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 20%;
  padding: 3vh 0 10vh;
  min-height: 100vh;
}

@media screen and (max-width: 640px) {
  .app-container {
    margin: 0 !important;
  }
}

.title-box {
  display: flex;
  justify-content: center;
  padding-bottom: 2vh;
}

.title-box .inner {
  width: 400px;
  height: 200px;
  line-height: 200px;
  font-size: 4em;
  font-family: sans-serif;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
}

.title-box .inner:first-child {
  background-color: blue;
  color: lightblue;
  transform-origin: right;
  transform: perspective(100px) rotateY(-15deg);
}

.title-box .inner:last-child {
  background-color: lightblue;
  color: blue;
  transform-origin: left;
  transform: perspective(100px) rotateY(15deg);
}

.title-box .inner span {
  position: absolute;
  animation: marquee 5s linear infinite;
}

@keyframes marquee {
  from {
    left: 100%;
  }

  to {
    left: -100%;
  }
}

.title-box .inner:first-child span {
  animation-delay: 2.6s;
  left: -100%;
}

.logo {
  max-height: 35vh;
}

.logo:hover {
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

@-moz-keyframes spin {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
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
