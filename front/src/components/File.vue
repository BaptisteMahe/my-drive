<template>
  <div class="box">
    <div class="title">{{ fileName }}</div>
    <div class="file-actions">
      <span class="action-button" @click="downloadFile()">Download</span>
      <span class="action-button" @click="deleteFile()">Delete</span>
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
        url: "http://node.persil.ovh1.ec-m.fr/fileDownload",
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
        url: "http://node.persil.ovh1.ec-m.fr/fileDelete",
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