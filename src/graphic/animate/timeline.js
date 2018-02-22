const Util = require('./util');

class Timeline {
  constructor() {
    const self = this;
    self.name = 'Global';
    self.anims = [];
    self.time = 0;
    self.totalTime = 0;
    self.loopCount = 0;
    self.loopMode = 0;
    self.playing = true;
    self.fps = 60; // 用于降频
    function animate() {
      self.loopInterval = Util.requestAnimationFrame(animate);
      self.playing && self.update();
    }
    animate();
  }

  loop(n) {
    this.loopMode = n;
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
        Util.cancelAnimationFrame(this.loopInterval);
        this.loopInterval = 0;
      }
    } else {
      deltaTime = 1 / this.fps;
    }

    if (this.playing) {
      this.totalTime += deltaTime;
      this.time += deltaTime;
    }
    if (this.loopMode !== 0) {
      const animationEnd = this.findAnimationEnd();
      if (this.time > animationEnd) {
        if (this.loopMode === -1 || (this.loopCount < this.loopMode)) {
          this.time = 0;
          this.loopCount++;
          for (let i = 0, len = this.anims.length; i < len; i++) {
            this.anims[i].hasStarted = false;
            this.anims[i].hasEnded = false;
          }
        } else {
          this.playing = false;
        }
      }
    }

    this.applyValues();
  }

  findAnimationEnd() {
    let endTime = 0;
    const anims = this.anims;
    for (let i = 0, len = anims.length; i < len; i++) {
      const anim = anims[i];
      if (anim.endTime > endTime) {
        endTime = anim.endTime;
      }
    }
    return endTime;
  }

  applyValues() {
    for (let i = 0; i < this.anims.length; i++) {
      const propertyAnim = this.anims[i];
      if (this.time < propertyAnim.startTime || propertyAnim.hasEnded) {
        continue;
      }
      const shape = propertyAnim.shape; // shape
      if (shape.get('destroyed')) {
        continue;
      }

      const key = propertyAnim.propertyName;
      let startValue = propertyAnim.target[key];
      let endValue = propertyAnim.endValue;
      const diff = propertyAnim.diff;
      if (this.time >= propertyAnim.startTime && !propertyAnim.hasStarted) {
        propertyAnim.hasStarted = true;
        if (propertyAnim.onStart) {
          propertyAnim.onStart();
        }
      }
      const duration = propertyAnim.endTime - propertyAnim.startTime;
      let t = duration ? (this.time - propertyAnim.startTime) / (duration) : 1;
      t = Math.max(0, Math.min(t, 1));
      t = propertyAnim.easing(t);

      const value = diff(t);
      let newValue;
      if (key === 'points') {
        newValue = [];
        startValue = Util.plainArray(startValue);
        endValue = Util.plainArray(endValue);
        const aLen = Math.max(startValue.length, endValue.length);
        for (let j = 0; j < aLen; j += 2) {
          newValue.push({
            x: value[j],
            y: value[j + 1]
          });
        }
      } else {
        newValue = value;
      }

      shape.attr(key, newValue);
      shape.get('canvas').draw();
      propertyAnim.target[key] = newValue;

      if (propertyAnim.parent && propertyAnim.parent.onUpdateCallback) {
        propertyAnim.parent.onUpdateCallback(propertyAnim);
      }

      if (this.time >= propertyAnim.endTime && !propertyAnim.hasEnded) {
        propertyAnim.hasEnded = true;
        if (propertyAnim.onEnd) {
          propertyAnim.onEnd();
        }
      }

      if (t === 1) {
        if (this.loopMode === 0) {
          this.anims.splice(i, 1);
          i--;
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
