<template>
  <form class="upload-form">
    <input
      multiple
      type="file"
      name="filetoupload"
      @change="onFilesChange($event)"
    />
    <button @click="uploadFiles()">Submit</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      files: { length: 0 },
    };
  },
  methods: {
    onFilesChange(event) {
      this.files = event.target.files;
    },
    uploadFiles() {
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append(this.files[i].name, this.files[i]);
      }
      axios
        .post("http://localhost:3000/fileUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>

<style>
.upload-form {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>