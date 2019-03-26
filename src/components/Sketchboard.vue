<template >
  <div class="sketchboard default-border default-shadow">
    <div class="sketchboard-header">
      <h4>Sketchboard</h4>
    </div>

    <div id="container" class="sketchboard-content">
      <canvas
        id="myCanvas"
        value="#ffffff"
        @mousedown="startDraw"
        @mousemove="draw"
        @mouseup="stopDraw"
        @mouseleave="stopDraw"
        @resize="resizeCanvas"
      ></canvas>
    </div>
  </div>
</template>

<style>
.sketchboard {
  min-width: 55%;
  margin-top: 16px;
  margin-left: 3%;
  margin-right: auto;
}
@media screen and (max-width: 1200px) {
  .sketchboard {
    min-width: 70%;
  }
}
@media screen and (max-width: 800px) {
  .sketchboard {
    min-width: 80%;
  }
}
.sketchboard-header h4 {
  text-align: center;
}
.sketchboard-content {
  height: 480px;
  background-color: white;
  border-top: 1px solid grey;
}

.shrink-enter-active,
.shrink-leave-active {
  transition: height 0.5s ease;
}
.shrink-enter, .shrink-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}
</style>
<script>
export default {
  data: () => {
    return {
      drawing: false,
      container: null,
      myCanvas: null,
      context: null,
      canvasRect: null,
      startPoint: null,
      endPoint: null
    };
  },
  methods: {
    toggleSBoard: function() {
      this.visible = !this.visible;
      const toggle = document.querySelector("#sbToggle");
      if (this.visible) {
        toggle.className = "fas fa-arrow-up";
      } else {
        toggle.className = "fas fa-arrow-down";
      }
    },
    startDraw: function(ev) {
      this.drawing = true;
      this.context.beginPath();
      this.startPoint = {
        x: ev.clientX - this.canvasRect.left,
        y: ev.clientY - this.canvasRect.top + document.documentElement.scrollTop
      };
    },
    draw: function(ev) {
      if (this.drawing) {
        const from = {
          x: this.startPoint.x,
          y: this.startPoint.y
        };
        this.context.moveTo(from.x, from.y);
        const to = {
          x: ev.clientX - this.canvasRect.left,
          y:
            ev.clientY -
            this.canvasRect.top +
            document.documentElement.scrollTop
        };
        this.context.lineTo(to.x, to.y);
        this.context.strokeStyle = "#000000";
        this.context.stroke();
        this.$socket.emit("drawing", {
          room: this.$store.getters.getProjectName,
          from: from,
          to: to
        });
        this.startPoint = {
          x: ev.clientX - this.canvasRect.left,
          y:
            ev.clientY -
            this.canvasRect.top +
            document.documentElement.scrollTop
        };
      }
    },
    stopDraw: function(ev) {
      this.drawing = false;
      this.context.closePath();
    },
    resizeCanvas: function() {
      this.myCanvas = document.getElementById("myCanvas");

      this.myCanvas.width = this.container.clientWidth;
      this.myCanvas.height = this.container.clientHeight;
      this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.h);
    }
  },
  mounted: function() {
    document.documentElement.scrollTop = 0;
    this.container = document.getElementById("container");
    this.myCanvas = document.getElementById("myCanvas");
    this.context = this.myCanvas.getContext("2d");
    this.canvasRect = this.myCanvas.getBoundingClientRect();

    this.resizeCanvas();
  },
  sockets: {
    receiveDrawings: function({ from, to }) {
      this.context.beginPath();
      this.context.moveTo(from.x, from.y);
      this.context.lineTo(to.x, to.y);
      this.context.strokeStyle = "#000000";
      this.context.stroke();
      this.context.closePath();
    }
  }
};
</script>
