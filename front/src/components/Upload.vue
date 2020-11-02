<template>
  <form
    class="upload-form"
    action="http://localhost:3000/fileupload"
    method="post"
    enctype="multipart/form-data"
  >
    <input multiple type="file" name="filetoupload" ref="uploadInput" />
    <input type="submit" />
  </form>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      files: { length: 0 },
    };
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