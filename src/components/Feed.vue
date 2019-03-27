<template>
  <div>
    <ul class="feed">
      <li v-for="post in posts" class="post default-border default-shadow">
        <div class="post-author">
          {{post.author}}
          <span style="font-size:10px">{{post.createdAt | moment("Do MMM YYYY")}}</span>
          <!-- <div class="post-author-avatar">
          <img height="60" alt="post author avatar" src> Lorenzo James
          </div>-->

          <i class="fas fa-trash-alt" @click="deletePost(post)"></i>
        </div>
        <div class="post-media">
          <img v-if="post.image" alt="post image" v-bind:src="'data:image/png;base64,'+ btoa(post.image.data)">
        </div>
        <div class="post-body">
          <p class="post-text">{{post.text}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>



<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.$store
      .dispatch("getPostsInProject")
      .then(response => {
        this.posts = response.reverse();
      })
      .catch(error => {});
  },
  sockets: {
    post({ post }) {
      this.posts.unshift(post);
    },
    postRemoved({ id }) {
      this.posts = this.posts.filter(el => {
        return el._id !== id;
      });
    }
  },
  methods: {
    deletePost(p) {
      this.$store
        .dispatch("deletePost", p._id)
        .then(response => {
          this.$socket.emit("removePost", {
            id: response._id,
            room: this.$store.getters.getProjectName
          });
        })
        .catch(error => {});
    },
    btoa(bin) {
      return Buffer.from(bin, "binary").toString("base64");
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
.feed {
  max-width: 55%;
  margin-left: 3%;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

@media screen and (max-width: 1200px) {
  .feed {
    max-width: 70%;
  }
}
@media screen and (max-width: 800px) {
  .feed {
    max-width: 80%;
  }
}

.post-divider {
  width: 32px;
}
.post {
  margin-top: 16px;
  margin-bottom: 16px;
  flex-basis: 100%;
  box-sizing: border-box;
  background-color: white;
  text-align: left;
}
.post-author {
  padding: 4px;
  font-size: 20px;
  border-bottom: 1px grey solid;
}
.post-author-avatar img {
  border-radius: 30px;
}
.post-media video {
  width: 100%;
}
.post-media img {
  width: 100%;
}
.post-text {
  padding: 8px;
}
</style>
