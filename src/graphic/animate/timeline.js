const requestAnimationFrame = typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function(fn) {
  return setInterval(fn, 16);
};
// const cancelAnimationFrame = typeof window === 'object' && window.cancelAnimationFrame ? window.cancelAnimationFrame : function(id) {
//   return clearInterval(id);
// };

const clock = typeof performance === 'object' && performance.now ? performance : Date;

class Timeline {
  constructor() {
    const self = this;
    self.name = 'Global';
    self.anims = [];
    self.time = clock.now();
    self.playing = true;
    self.canvas = [];
    function animate() {
      self.loopInterval = requestAnimationFrame(animate);
      self.playing && self.update();
    }
    animate();
  }

  stop() {
    this.playing = false;
    this.time = clock.now();
    this.canvas = [];
  }

  pause() {
    this.playing = false;
  }

  play() {
    this.playing = true;
  }

  update() {
    const currentTime = clock.now();
    this.canvas = [];

    for (let i = 0; i < this.anims.length; i++) {
      const propertyAnim = this.anims[i];
      if (currentTime < propertyAnim.startTime || propertyAnim.hasEnded) {
        continue;
      }
      const shape = propertyAnim.shape; // shape
      if (shape.get('destroyed')) {
        this.anims.splice(i, 1);
        i--;
        continue;
      }

      const { startState, endState, interpolate, duration } = propertyAnim;
      if (currentTime >= propertyAnim.startTime && !propertyAnim.hasStarted) {
        propertyAnim.hasStarted = true;
        if (propertyAnim.onStart) {
          propertyAnim.onStart();
        }
      }
      let t = (currentTime - propertyAnim.startTime) / duration;
      t = Math.max(0, Math.min(t, 1));
      t = propertyAnim.easing(t);
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
        shape._attrs.attrs[key] = newValue;
      }

      const canvas = shape.get('canvas');
      if (this.canvas.indexOf(canvas) === -1) {
        this.canvas.push(canvas);
      }

      if (propertyAnim.onUpdate) {
        propertyAnim.onUpdate();
      }

      if (currentTime >= propertyAnim.endTime && !propertyAnim.hasEnded) {
        propertyAnim.hasEnded = true;
        if (propertyAnim.onEnd) {
          propertyAnim.onEnd();
        }
      }

      if (t === 1) { // 结束
        this.anims.splice(i, 1);
        i--;
      }
    }

    if (this.anims.length) {
      this.canvas.map(c => {
        c.draw();
        return c;
      });
    }
    this.time = clock.now();
  }
}

Timeline.getGlobalInstance = function() {
  if (!Timeline.globalInstance) {
    Timeline.globalInstance = new Timeline();
  }
  return Timeline.globalInstance;
};

module.exports = Timeline;
