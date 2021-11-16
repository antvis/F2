const requestAnimationFrame =
  typeof window === 'object' && window.requestAnimationFrame
    ? window.requestAnimationFrame
    : function (fn) {
        return setTimeout(fn, 16);
      };

const cancelAnimationFrame =
  typeof window === 'object' && window.cancelAnimationFrame
    ? window.cancelAnimationFrame
    : function (number) {
        return clearTimeout(number);
      };

const clock = typeof performance === 'object' && performance.now ? performance : Date;

type UpdateCallback = (time: number) => void;
type EndCallback = () => void;

class Timeline {
  playing = false;
  // 暂停中
  paused = false;
  // 暂停的时间点
  pausedTime = 0;
  // 动画持续时间
  duration: number;
  // 计时器id
  animationFrameNumber;
  onUpdate: UpdateCallback;
  onEnd: EndCallback;

  play(duration: number, onUpdate: UpdateCallback, onEnd: EndCallback) {
    if (duration <= 0) {
      onEnd();
      return;
    }
    // 上次动画未结束
    if (this.playing) {
      return;
    }
    // 记录 duration、onUpdate、onEnd
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.onEnd = onEnd;
    const { paused, pausedTime } = this;
    this.playing = true;
    let startTime = clock.now();

    // 如果当前正在暂停状态， 从暂停态继续播放
    if (paused && pausedTime) {
      startTime = startTime - pausedTime;
      this.paused = false;
      this.pausedTime = 0;
    }

    const play = () => {
      const now = clock.now();
      const time = now - startTime;
      if (time >= duration) {
        onUpdate(duration);
        onEnd();
        this.playing = false;
        return;
      }
      if (this.paused) {
        onUpdate(time);
        this.pausedTime = time;
        this.playing = false;
        return;
      }
      onUpdate(time);
      this.animationFrameNumber = requestAnimationFrame(play);
    };
    this.animationFrameNumber = requestAnimationFrame(play);
  }

  pause() {
    this.paused = true;
  }

  stop() {
    this.playing = false;
  }

  end() {
    if (!this.playing) {
      return;
    }
    // 停掉动画
    this.abort();

    // 更新到最后一帧状态
    this.onUpdate(this.duration);
    this.onEnd();
  }

  abort() {
    if (!this.animationFrameNumber) {
      return;
    }
    cancelAnimationFrame(this.animationFrameNumber);
    this.playing = false;
    this.animationFrameNumber = null;
  }
}

export default Timeline;
