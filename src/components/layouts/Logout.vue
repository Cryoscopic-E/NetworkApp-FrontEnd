<template></template>

<script>
export default {
  created() {
    const room = this.$store.getters.getProjectName;

    this.$store.dispatch("logOut").then(response => {
      this.$router.push({ name: "home" });
      this.$socket.emit("disconnected", {
        room
      });
    });
  }
};
</script>
