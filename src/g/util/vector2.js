/**
 * @fileOverview 简单的向量运算
 * @author dxq613@gmail.com
 */

class Vector2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const inv = 1 / this.length();
    return new Vector2(this.x * inv, this.y * inv);
  }

  add(v) {
    return Vector2.add(this, v);
  }

  sub(v) {
    return Vector2.sub(this, v);
  }

  multiply(f) {
    return new Vector2(this.x * f, this.y * f);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  angle(v) {
    const cosTheta = this.dot(v) / (this.length() * v.length());
    return Math.acos(cosTheta);
  }

  min(v) {
    if (this.x > v.x) {
      this.x = v.x;
    }

    if (this.y > v.y) {
      this.y = v.y;
    }
    return this;
  }

  max(v) {
    if (this.x < v.x) {
      this.x = v.x;
    }

    if (this.y < v.y) {
      this.y = v.y;
    }

    return this;
  }

  angleTo(v) {
    const theta = this.angle(v);
    const direct = this.direction(v);
    if (direct >= 0) {
      return theta;
    }
    return Math.PI * 2 - theta;
  }

  zero() {
    return this.x === 0 && this.y === 0;
  }

  direction(v) {
    return this.x * v.y - v.x * this.y;
  }

  distanceTo(v) {
    return Vector2.sub(this, v).length();
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  getPoint() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

Vector2.add = function(v1, v2) {
  return new Vector2(v1.x + v2.x, v1.y + v2.y);
};

Vector2.sub = function(v1, v2) {
  return new Vector2(v1.x - v2.x, v1.y - v2.y);
};

module.exports = Vector2;
