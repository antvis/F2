/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2019 Tim Guan-tin Chien and contributors.
 * Released under the MIT license
 */

import { isFunction } from '@antv/util';

// Based on http://jsfromhell.com/array/shuffle
var shuffleArray = function shuffleArray(arr) {
  for (var j, x, i = arr.length; i; ) {
    j = Math.floor(Math.random() * i);
    x = arr[--i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

function randomHslColor(min, max) {
  return (
    'hsl(' +
    (Math.random() * 360).toFixed() +
    ',' +
    (Math.random() * 30 + 70).toFixed() +
    '%,' +
    (Math.random() * (max - min) + min).toFixed() +
    '%)'
  );
}

const shapes = (shape) => {
  if (isFunction(shape)) {
    return shape;
  }
  switch (shape) {
    case 'circle':
      return () => 1;

    case 'cardioid':
      return function shapeCardioid(theta) {
        return 1 - Math.sin(theta);
      };

    /*
        To work out an X-gon, one has to calculate "m",
        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
        where t' equals to mod(t, 2PI/X)
       */

    case 'diamond':
      // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
      // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
      // +0+..+2*PI
      return function shapeSquare(theta) {
        var thetaPrime = theta % ((2 * Math.PI) / 4);
        return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
      };

    case 'square':
      // http://www.wolframalpha.com/input/?i=plot+r+%3D+min(1%2Fabs(cos(t
      // )),1%2Fabs(sin(t)))),+t+%3D+0+..+2*PI
      return function shapeSquare(theta) {
        return Math.min(1 / Math.abs(Math.cos(theta)), 1 / Math.abs(Math.sin(theta)));
      };

    case 'triangle-forward':
      // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
      // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
      // %29%29%2C+t+%3D+0+..+2*PI
      return function shapeTriangle(theta) {
        var thetaPrime = theta % ((2 * Math.PI) / 3);
        return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
      };

    case 'triangle':
    case 'triangle-upright':
      return function shapeTriangle(theta) {
        var thetaPrime = (theta + (Math.PI * 3) / 2) % ((2 * Math.PI) / 3);
        return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
      };

    case 'pentagon':
      return function shapePentagon(theta) {
        var thetaPrime = (theta + 0.955) % ((2 * Math.PI) / 5);
        return 1 / (Math.cos(thetaPrime) + 0.726543 * Math.sin(thetaPrime));
      };

    case 'star':
      return function shapeStar(theta) {
        var thetaPrime = (theta + 0.955) % ((2 * Math.PI) / 10);
        if (((theta + 0.955) % ((2 * Math.PI) / 5)) - (2 * Math.PI) / 10 >= 0) {
          return (
            1 /
            (Math.cos((2 * Math.PI) / 10 - thetaPrime) +
              3.07768 * Math.sin((2 * Math.PI) / 10 - thetaPrime))
          );
        } else {
          return 1 / (Math.cos(thetaPrime) + 3.07768 * Math.sin(thetaPrime));
        }
      };
  }
};

const colors = (color) => {
  if (isFunction(color)) {
    return color;
  }
  switch (color) {
    case 'random-dark':
      return () => randomHslColor(10, 50);

    case 'random-light':
      return () => randomHslColor(50, 90);

    default:
      return () => color;
  }
};

var WordCloud = function WordCloud(context, settings) {
  /* Make sure gridSize is a whole number and is not smaller than 4px */
  const g = Math.max(Math.floor(settings.gridSize), 4);

  /* normalize rotation settings */
  var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
  var rotationSteps = Math.abs(Math.floor(settings.rotationSteps));
  var minRotation = Math.min(settings.maxRotation, settings.minRotation);

  // grid 的大小
  const ngx = Math.floor(settings.width / g);
  const ngy = Math.floor(settings.height / g);

  // Determine the center of the word cloud
  const center = [ngx / 2, ngy / 2];

  // Maxium radius to look for space
  const maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

  /* Clear the canvas only if the clearCanvas is set,
         if not, update the grid to the current canvas state */
  const grid = [];

  var gx, gy, i;

  if (settings.clearCanvas) {
    /* fill the grid with empty state */
    gx = ngx;
    while (gx--) {
      grid[gx] = [];
      gy = ngy;
      while (gy--) {
        grid[gx][gy] = true;
      }
    }
  } else {
    var originPixelData = [0, 0, 0, 0];

    /* Read back the pixels of the canvas we got to tell which part of the
           canvas is empty.
           (no clearCanvas only works with a canvas, not divs) */
    var imageData = context.getImageData(0, 0, ngx * g, ngy * g).data;
    // Clear the canvas
    context.clearRect(0, 0, settings.width, settings.height);

    gx = ngx;
    var x, y;
    while (gx--) {
      grid[gx] = [];
      gy = ngy;
      while (gy--) {
        y = g;
        /* eslint no-labels: ["error", { "allowLoop": true }] */
        singleGridLoop: while (y--) {
          x = g;
          while (x--) {
            i = 4;
            while (i--) {
              if (
                imageData[((gy * g + y) * ngx * g + (gx * g + x)) * 4 + i] === originPixelData[i]
              ) {
                grid[gx][gy] = false;
                break singleGridLoop;
              }
            }
          }
        }
        if (grid[gx][gy] !== false) {
          grid[gx][gy] = true;
        }
      }
    }

    imageData = undefined;
  }

  /* Get points on the grid for a given radius away from the center */
  var pointsAtRadius = [];
  var getPointsAtRadius = function getPointsAtRadius(radius) {
    if (pointsAtRadius[radius]) {
      return pointsAtRadius[radius];
    }

    // Look for these number of points on each radius
    var T = radius * 8;

    // Getting all the points at this radius
    var t = T;
    var points = [];

    if (radius === 0) {
      points.push([center[0], center[1], 0]);
    }

    while (t--) {
      // distort the radius to put the cloud in shape
      const rx = shapes(settings.shape)((t / T) * 2 * Math.PI); // 0 to 1

      // Push [x, y, t] t is used solely for getTextColor()
      points.push([
        center[0] + radius * rx * Math.cos((-t / T) * 2 * Math.PI),
        center[1] + radius * rx * Math.sin((-t / T) * 2 * Math.PI) * settings.ellipticity,
        (t / T) * 2 * Math.PI,
      ]);
    }

    pointsAtRadius[radius] = points;
    return points;
  };

  /* Get the deg of rotation according to settings, and luck. */
  var getRotateDeg = function getRotateDeg() {
    if (settings.rotateRatio === 0) {
      return 0;
    }

    if (Math.random() > settings.rotateRatio) {
      return 0;
    }

    if (rotationRange === 0) {
      return minRotation;
    }

    if (rotationSteps > 0) {
      // Min rotation + zero or more steps * span of one step
      return (
        minRotation +
        (Math.floor(Math.random() * rotationSteps) * rotationRange) / (rotationSteps - 1)
      );
    } else {
      return minRotation + Math.random() * rotationRange;
    }
  };

  var getTextInfo = function getTextInfo(word, weight, rotateDeg, extraDataArray) {
    // calculate the acutal font size
    // fontSize === 0 means weightFactor function wants the text skipped,
    // and size < minSize means we cannot draw the text.
    var fontSize = weight;
    if (fontSize <= settings.minSize) {
      return false;
    }

    // Get fontWeight that will be used to set fctx.font
    var fontWeight = isFunction(settings.fontWeight)
      ? settings.fontWeight(word, weight, fontSize, extraDataArray)
      : settings.fontWeight;

    context.clearRect(0, 0, settings.width, settings.height);
    context.save();
    context.font = fontWeight + ' ' + fontSize.toString(10) + 'px ' + settings.fontFamily;

    // Estimate the dimension of the text with measureText().
    var fw = context.measureText(word).width;
    var fh = Math.max(
      fontSize,
      context.measureText('m').width,
      context.measureText('\uFF37').width
    );

    // Create a boundary box that is larger than our estimates,
    // so text don't get cut of (it sill might)
    var boxWidth = fw;
    var boxHeight = fh * 3;
    var fgw = Math.ceil(boxWidth / g);
    var fgh = Math.ceil(boxHeight / g);
    boxWidth = fgw * g;
    boxHeight = fgh * g;

    // Calculate the proper offsets to make the text centered at
    // the preferred position.

    // This is simply half of the width.
    var fillTextOffsetX = -fw / 2;
    // Instead of moving the box to the exact middle of the preferred
    // position, for Y-offset we move 0.4 instead, so Latin alphabets look
    // vertical centered.
    var fillTextOffsetY = -fh * 0.4;

    // Calculate the actual dimension of the canvas, considering the rotation.
    var cgh = Math.ceil(
      (boxWidth * Math.abs(Math.sin(rotateDeg)) + boxHeight * Math.abs(Math.cos(rotateDeg))) / g
    );
    var cgw = Math.ceil(
      (boxWidth * Math.abs(Math.cos(rotateDeg)) + boxHeight * Math.abs(Math.sin(rotateDeg))) / g
    );
    var width = cgw * g;
    var height = cgh * g;

    context.translate(width / 2, height / 2);
    context.rotate(-rotateDeg);

    // Once the width/height is set, ctx info will be reset.
    // Set it again here.

    // Fill the text into the fcanvas.
    // XXX: We cannot because textBaseline = 'top' here because
    // Firefox and Chrome uses different default line-height for canvas.
    // Please read https://bugzil.la/737852#c6.
    // Here, we use textBaseline = 'middle' and draw the text at exactly
    // 0.5 * fontSize lower.
    context.fillStyle = '#000';
    context.textBaseline = 'middle';
    context.fillText(word, fillTextOffsetX, fillTextOffsetY + fontSize * 0.5);

    // Get the pixels of the text
    context.restore();
    var imageData = context.getImageData(0, 0, width, height).data;
    context.clearRect(0, 0, width, height);

    // Read the pixels and save the information to the occupied array
    var occupied = [];
    var gx = cgw;
    var gy, x, y;
    var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
    while (gx--) {
      gy = cgh;
      while (gy--) {
        y = g;
        /* eslint no-labels: ["error", { "allowLoop": true }] */
        singleGridLoop: while (y--) {
          x = g;
          while (x--) {
            if (imageData[((gy * g + y) * width + (gx * g + x)) * 4 + 3]) {
              occupied.push([gx, gy]);

              if (gx < bounds[3]) {
                bounds[3] = gx;
              }
              if (gx > bounds[1]) {
                bounds[1] = gx;
              }
              if (gy < bounds[0]) {
                bounds[0] = gy;
              }
              if (gy > bounds[2]) {
                bounds[2] = gy;
              }
              break singleGridLoop;
            }
          }
        }
      }
    }

    // Return information needed to create the text on the real canvas
    return {
      mu: 1,
      occupied: occupied,
      bounds: bounds,
      gw: cgw,
      gh: cgh,
      fillTextOffsetX: fillTextOffsetX,
      fillTextOffsetY: fillTextOffsetY,
      fillTextWidth: fw,
      fillTextHeight: fh,
      fontSize: fontSize,
    };
  };

  /* Determine if there is room available in the given dimension */
  var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
    // Go through the occupied points,
    // return false if the space is not available.
    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];

      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        if (!settings.drawOutOfBound) {
          return false;
        }
        continue;
      }

      if (!grid[px][py]) {
        return false;
      }
    }
    return true;
  };

  /* Help function to updateGrid */
  var fillGridAt = function fillGridAt(x, y) {
    if (x >= ngx || y >= ngy || x < 0 || y < 0) {
      return;
    }

    grid[x][y] = false;
  };

  /* Update the filling information of the given space with occupied points.
       Draw the mask on the canvas if necessary. */
  var updateGrid = function updateGrid(gx, gy, gw, gh, info) {
    var occupied = info.occupied;

    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];

      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        continue;
      }

      fillGridAt(px, py);
    }
  };

  /* putWord() processes each item on the list,
       calculate it's size and determine it's position, and actually
       put it on the canvas. */
  var putWord = function putWord(item) {
    var word, weight, attributes;
    if (Array.isArray(item)) {
      word = item[0];
      weight = item[1];
      attributes = item[2];
    } else {
      word = item.word;
      weight = item.weight;
      attributes = item.attributes;
    }
    var rotateDeg = getRotateDeg();

    // get info needed to put the text onto the canvas
    var info = getTextInfo(word, weight, rotateDeg, attributes);

    // not getting the info means we shouldn't be drawing this one.
    if (!info) {
      return false;
    }

    // If drawOutOfBound is set to false,
    // skip the loop if we have already know the bounding box of
    // word is larger than the canvas.
    if (!settings.drawOutOfBound) {
      var bounds = info.bounds;
      if (bounds[1] - bounds[3] + 1 > ngx || bounds[2] - bounds[0] + 1 > ngy) {
        return false;
      }
    }

    // Determine the position to put the text by
    // start looking for the nearest points
    var r = maxRadius + 1;

    var tryToPutWordAtPoint = function(gxy) {
      var gx = Math.floor(gxy[0] - info.gw / 2);
      var gy = Math.floor(gxy[1] - info.gh / 2);
      var gw = info.gw;
      var gh = info.gh;

      // If we cannot fit the text at this position, return false
      // and go to the next position.
      if (!canFitText(gx, gy, gw, gh, info.occupied)) {
        return false;
      }

      // Mark the spaces on the grid as filled
      updateGrid(gx, gy, gw, gh, info);

      // Return true so some() will stop and also return true.
      return true;
    };

    while (r--) {
      var points = getPointsAtRadius(maxRadius - r);

      if (settings.shuffle) {
        points = [].concat(points);
        shuffleArray(points);
      }

      // Try to fit the words by looking at each point.
      // array.some() will stop and return true
      // when putWordAtPoint() returns true.
      // If all the points returns false, array.some() returns false.
      var point = points.find(tryToPutWordAtPoint);

      if (point) {
        var fontSize = info.fontSize;
        var color = colors(settings.color)(word, weight, attributes);

        // get fontWeight that will be used to set ctx.font and font style rule
        var fontWeight = settings.fontWeight;

        var gx = Math.floor(point[0] - info.gw / 2);
        var gy = Math.floor(point[1] - info.gh / 2);
        const x = (gx + info.gw / 2) * g;
        const y = (gy + info.gh / 2) * g + info.fillTextOffsetY + fontSize * 0.5;

        return {
          x,
          y,
          word,
          weight,
          attributes,
          rotate: rotateDeg,
          color,
          fontWeight,
          fontSize,
          fontFamily: settings.fontFamily,
        };
      }
    }
    // we tried all distances but text won't fit, return false
    return false;
  };

  const list = [];
  settings.list.forEach((item) => {
    const wordItem = putWord(item);
    if (wordItem) {
      list.push(wordItem);
    }
  });
  return list;
};

export default WordCloud;
