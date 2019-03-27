<template>
  <div class="new-post default-border default-shadow">
    <div class="new-post-header">
      <h4>New Post</h4>
    </div>
    <div class="new-post-content">
      <textarea name="post-text" id="post-text" cols="30" rows="5" placeholder="New Post"></textarea>
    </div>
    <div class="new-post-actions">
      <form action>
        <input type="file" id="imgupload" style="display:none">
        <i class="far fa-images icon" @click="uploadImage"></i>
      </form>
      <button class="primary-bg default-border-radius" id="add-post" @click="submitNewPost">Add Post</button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    submitNewPost() {
      const text = document.querySelector("#post-text").value;
      document.querySelector("#post-text").value = "";
      if (text.trim() === "") {
        return;
      } else {
        this.$store
          .dispatch("createNewPost", { text })
          .then(res => {
            this.$socket.emit("newPost", {
              post: res,
              room: this.$store.getters.getProjectName
            });
          })
          .catch(err => {});
      }
    },
    uploadImage() {
      document.querySelector("#imgupload").trigger("click");
    }
  }
};
</script>

<style>
textarea {
  resize: none;
}
.new-post {
  min-width: 55%;
  margin-left: 3%;

  margin-top: 16px;
  margin-right: auto;
}
@media screen and (max-width: 1200px) {
  .new-post {
    min-width: 70%;
  }
}
@media screen and (max-width: 800px) {
  .new-post {
    min-width: 80%;
  }
}
.new-post-header h4 {
  text-align: center;
  margin-bottom: 0px;
}
.new-post-content {
  height: 126px;
}
.new-post-actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
#post-text {
  width: 100%;
  height: 128px;
  padding: 10px;
}
#add-post {
  padding: 6px;
}
.icon {
  font-size: 30px;
  padding: 16px;
}
</style>
