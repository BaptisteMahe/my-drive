<template>
  <div class="box" @click="download()">
    <div class="title">{{ fileName }}</div>
  </div>
</template>

<script>
import axios from "axios";
import fileDownload from "js-file-download";

export default {
  name: "File",
  props: {
    fileName: String,
  },
  methods: {
    download() {
      axios({
        method: "GET",
        url: "http://localhost:3000/fileDownload",
        params: {
          fileName: this.fileName,
        },
        responseType: "blob",
      }).then((response) => {
        fileDownload(response.data, this.fileName);
      });
    },
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