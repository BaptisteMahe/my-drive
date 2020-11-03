<template>
  <form class="upload-form">
    <div class="file-input">
      <input
        multiple
        type="file"
        name="file"
        id="file"
        @change="onFilesChange($event)"
      />
      <span class="button">Upload</span>
      <span class="label" v-bind:class="{ 'files-selected': isFilesSelected }">
        {{ filesDisplay }}
      </span>
    </div>
    <span class="submit-button" @click="uploadFiles()">Submit</span>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      files: { length: 0 },
      filesDisplay: "No file selected",
      isFilesSelected: false,
    };
  },
  methods: {
    onFilesChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.files = event.target.files;
        let nameArray = [];
        Object.values(event.target.files).forEach((file) => {
          nameArray.push(file.name);
        });
        this.filesDisplay = nameArray.join(", ");
        this.isFilesSelected = true;
      } else {
        this.filesDisplay = "No file selected";
        this.isFilesSelected = false;
      }
    },
    uploadFiles() {
      if (this.files.length > 0) {
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
      } else {
        console.error("No file seleced for upload");
      }
    },
  },
};
</script>

<style scoped>
.upload-form {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 0 2vh;
}

.file-input {
  display: inline-block;
  text-align: left;
  background: #fff;
  padding: 16px;
  width: 450px;
  position: relative;
  border-radius: 5px 0 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-input > [type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}

.file-input > .button {
  display: inline-block;
  cursor: pointer;
  background: #eee;
  padding: 8px 16px;
  border-radius: 3px;
  margin-right: 8px;
}

.file-input:hover > .button {
  background: blue;
  color: white;
}

.file-input > .label {
  color: #333;
  opacity: 0.3;
}

.files-selected {
  opacity: 1 !important;
}

.submit-button {
  background: blue;
  color: white;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  padding: 24px;
}
</style>