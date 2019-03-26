<template>
  <div class="main-area">
    <div class="feed-area">
      <sketchboard/>
      <new-post/>
      <feed/>
    </div>

    <div class="contacts">
      <chat/>
    </div>
  </div>
</template>

<style>
.main-area {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.feed-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 66px;
}
.contacts {
  flex-grow: 0;
  display: flex;
  margin-top: 66px;
}
</style>

<script>
import NewPost from "./NewPost";
import Chat from "./Chat.vue";
import Feed from "./Feed";
import Sketchboard from "./Sketchboard";
export default {
  components: {
    NewPost,
    Chat,
    Feed,
    Sketchboard
  },
  data() {
    return {
      user: undefined
    };
  },
  created() {
    if (this.$store.getters.loggedIn) {
      this.$socket.emit("join", {
        username: this.$store.getters.getUserName,
        room: this.$store.getters.getProjectName
      });
    }
  }
};
</script>