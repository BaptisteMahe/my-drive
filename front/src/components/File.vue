<template>
  <div class="box">
    <div class="title">{{ fileName }}</div>
    <div class="file-actions">
      <button class="action-button" @click="downloadFile()">download</button>
      <button class="action-button" @click="deleteFile()">delete</button>
    </div>
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
    downloadFile() {
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
    deleteFile() {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/fileDelete",
        params: {
          fileName: this.fileName,
        },
      }).then(() => {
        window.location.reload();
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
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.action-button {
  margin: 5px;
}
.box:hover {
  background-color: rgb(44, 62, 80, 0.1);
}
</style>