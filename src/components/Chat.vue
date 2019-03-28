<template>
  <div>
    <div class="chatbox">
      <div class="chatbox-header">
        <h6>Chat</h6>
      </div>
      <div id="log" class="chatlogs" v-chat-scroll>
        <template v-for="m in messages">
          <div class="chat self" v-if="m.from === me">
            <p class="chat-message primary-bg">
              <span style="font-size:10px">Me:</span>
              {{m.message}}
            </p>
          </div>
          <div class="chat friend" v-if="m.from !== me">
            <p class="chat-message secondary-bg">
              <span style="font-size:10px">{{m.from}}:</span>
              {{m.message}}
            </p>
          </div>
        </template>
      </div>

      <div class="chat-form">
        <form>
          <input
            id="messageArea"
            placeholder="Message"
            type="text"
            name="message"
            required
            autocomplete="off"
            @submit="newMessage"
          >
          <button class="primary-bg default-border-radius" @click="newMessage">Send</button>
        </form>
      </div>
    </div>
    <div class="contact-list">
      <h4>Online:</h4>
      <ul>
        <li v-for="user in users">
          <div class="contact">
            <div class="user-name">
              <div class="image-circle">
                <img
                  v-if="user.avatar"
                  width="40"
                  height="40"
                  v-bind:src="'data:image/png;base64,'+ user.avatar"
                >
              </div>
              {{user.username}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      me: "",
      users: [],
      messages: []
    };
  },
  methods: {
    newMessage: function(e) {
      e.preventDefault();
      const messageArea = document.querySelector("#messageArea");
      const message = messageArea.value;
      if (message !== "") {
        messageArea.value = "";
        messageArea.focus();
        const from = this.$store.getters.getUserName;
        const room = this.$store.getters.getProjectName;
        this.$socket.emit("newMessage", { message, from, room });
      }
    }
  },
  created: function() {
    this.me = this.$store.getters.getUserName;
  },
  sockets: {
    message: function({ message, from }) {
      this.messages.push({ message, from });
      const lastMessage = document.querySelector("#log").lastElementChild;
      if (lastMessage !== null) {
        document.querySelector("#log").scrollTop =
          lastMessage.scrollHeight * this.messages.length;
      }
    },
    chatData: function({ users }) {
      this.users = users;
    }
  }
};
</script>
<style>
.image-circle {
  width: 40px;
  height: 40px;
  border: 1px solid grey;
  border-radius: 30px;
}
.image-circle img {
  border-radius: 30px;
}
ul {
  list-style-type: none;
}
.chatbox {
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 100%;
  padding: 16px;
  position: fixed;
  right: 280px;
  border-left: gray 1px solid;
  border-top: gray 1px solid;
}

@media screen and (max-width: 1700px) {
  .chatbox {
    display: none !important;
  }
}
.chatbox-header {
  display: flex;
  justify-content: space-between;
}
.close-icon {
  cursor: pointer;
}
.chatlogs {
  height: calc(100% - 180px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.chat {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
}

.chat .chat-message {
  width: 300px;
  padding: 15px;
  margin: 5px 10px 0;
  border-radius: 10px;
  color: black;
  font-size: 18px;
}
.friend .chat-message {
  order: 0;
}
.self .chat-message {
  margin-left: auto;
}
.chat-form {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
}
.chat-form input {
  background: #fbfbfb;
  padding: 10px;
  width: 66%;
  height: 57px;
  margin-top: 10px;
  border: 2px solid #eee;
  border-radius: 3px;
  resize: none;
  font-size: 20px;
  color: black;
}
.chat-form input:focus {
  background: #fff;
}
.chat-form button {
  background: lightcyan;
  padding: 8px 18px;
  color: black;
  margin: 10px;
  border-radius: 3px;
  cursor: pointer;
}
.contact-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 280px;
  padding: 8px;
  position: fixed;
  right: 0px;
  border-left: 1px gray solid;
}
@media screen and (max-width: 1700px) {
  .contact-list {
    display: none !important;
  }
}
.contact {
  margin-bottom: 8px;
  display: flex;
  vertical-align: center;
  border-radius: 30px;
}
.user-name {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
}
</style>


