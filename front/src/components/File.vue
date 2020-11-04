<template>
  <div class="box">
    <div class="title">{{ fileName }}</div>
    <div class="file-actions">
      <span class="action-button download" @click="downloadFile()"
        >Download</span
      >
      <span class="action-button delete" @click="deleteFile()">Delete</span>
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

  border-style: solid;
  border-radius: 10px;
  font-size: 1.2em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: white;

  word-wrap: break-word;
  overflow: auto;
}

@media screen and (max-width: 1000px) {
  .box {
    width: 40%;
  }

  .title {
    font-size: 0.8em;
  }
}

.title {
  padding: 5px 12px;
}

.action-button {
  font-size: 0.7em;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  background: #eee;
  padding: 4px 8px;
  border-radius: 3px;
}

.action-button:hover {
  background: blue;
  color: white;
}

.box:hover {
  background-color: rgb(44, 62, 80, 0.1);
}
</style>