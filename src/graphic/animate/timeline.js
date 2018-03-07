const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
  return setInterval(fn, 16);
};
const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(id) {
  return clearInterval(id);
};

class Timeline {
  constructor() {
    const self = this;
    self.name = 'Global';
    self.anims = [];
    self.time = 0;
    self.totalTime = 0;
    self.playing = true;
    self.fps = 60; // 用于降频
    function animate() {
      // if (totalTime === 0 && this.anims.length > 0) {
      //   for()
      // }
      self.loopInterval = requestAnimationFrame(animate);
      self.playing && self.update();
    }
    animate();
  }

  stop() {
    this.playing = false;
    this.time = 0;
  }

  pause() {
    this.playing = false;
  }

  play() {
    this.playing = true;
  }

  update(deltaTime) {
    if (deltaTime !== undefined) {
      if (this.loopInterval !== 0) {
        cancelAnimationFrame(this.loopInterval);
        this.loopInterval = 0;
      }
    } else {
      deltaTime = 1000 / this.fps;
    }

    if (this.playing) {
      this.totalTime += deltaTime;
      this.time += deltaTime;
    }

    this.applyValues();
  }

  applyValues() {
    for (let i = 0; i < this.anims.length; i++) {
      const propertyAnim = this.anims[i];
      if (this.time < propertyAnim.startTime || propertyAnim.hasEnded) {
        continue;
      }
      const shape = propertyAnim.shape; // shape
      if (shape.get('destroyed')) {
        this.anims.splice(i, 1);
        i--;
        continue;
      }

      const { startState, endState, interpolate } = propertyAnim;
      if (this.time >= propertyAnim.startTime && !propertyAnim.hasStarted) {
        propertyAnim.hasStarted = true;
        if (propertyAnim.onStart) {
          propertyAnim.onStart();
        }
      }
      const duration = propertyAnim.endTime - propertyAnim.startTime;
      let t = duration ? (this.time - propertyAnim.startTime) / (duration) : 1;
      t = Math.max(0, Math.min(t, 1));

      if (t === 1) { // 结束
        this.anims.splice(i, 1);
        i--;
      }

      t = propertyAnim.easing(t);
      const newState = {};
      for (const key in interpolate) {
        const diff = interpolate[key];
        const value = diff(t);
        let newValue;
        if (key === 'points') {
          newValue = [];
          const aLen = Math.max(startState.points.length, endState.points.length);
          for (let j = 0; j < aLen; j += 2) {
            newValue.push({
              x: value[j],
              y: value[j + 1]
            });
          }
        } else {
          newValue = value;
        }
        newState[key] = newValue;
      }

      shape.attr(newState);
      shape.get('canvas').draw();

      if (propertyAnim.parent && propertyAnim.parent.onUpdateCallback) {
        propertyAnim.parent.onUpdateCallback(propertyAnim);
      }
      if (this.time >= propertyAnim.endTime && !propertyAnim.hasEnded) {
        propertyAnim.hasEnded = true;
        if (propertyAnim.onEnd) {
          propertyAnim.onEnd();
        }
      }
    }
  }
}

Timeline.getGlobalInstance = function() {
  if (!Timeline.globalInstance) {
    Timeline.globalInstance = new Timeline();
  }
  return Timeline.globalInstance;
};

module.exports = Timeline;
