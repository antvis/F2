# Update

## From G2-mobile to F2

F2 is an upgrade from G2-mobile, and is basically compatible with G2-mobile. This chapter lists the precautions for upgrading from G2-mobile to F2.

### Difference between F2 and G2-mobile

Changes compares to G2-mobile:

* Namespace changes to F2, not GM anymore. `Not compatible`

* Simply animate interface. `Not compatible`

  ```js
   // G2-mobile 2.0
     chart.animate().wavec({
      duration: 2000,
      easing: 'elastic',
      success() {
        alert('ok');
      } 
     });
     
     // F2 3.0
     chart.animate({
      type: 'wavec',
      duration: 2000,
      easing: 'elastic',
      success() {
        alert('ok');
      } 
     });
  ```

* configuration when calling `new Chart()`:

  * `margin` changes to `padding`

    `Margin` also retains support for upgrades:

    ```js
      // G2-mobile 2.0
      const chart = new Chart({
        margin: 20
      });
      // F2 3.0
      const chart = new Chart({
        padding: 20
      });
    ```

  * Add with and height property, you don't have to specify width and height on canvas now.

  * Add pixelRatio property

* Chart no longer supports `intervalStack`, `intervalDodge`, `areaStack`. `Not Compatible`.

  All geometries in F2 3.0 supports data adjustment.

  ```js
  // G2-mobile 2.0
    chart.intervalStack().position('a*b');
    // F2 3.0
    chart.interval().position().adjust('stack')
  ```

* Custom Shape interface, changed the function name, but retain the original function name support.

  * `registShape` changed to `registerShape`
  * `getShapePoints` changed to `getPoints`
  * `drawShape` changed to `draw`

  ```js
  // G2-mobile 2.0
  GM.Shape.registShape('interval', 'custom', {
    getShapePoints(cfg) {},
    drawShape(cfg, canvas) {}
  });
  // F2 3.0
  F2.Shape.registerShape('interval', 'custom', {
    getPoints(cfg) {},
    draw(cfg, canvas) {}
  });
  ```

* Mask of `timeCat` changed to standard format. For more details, read [fecha](https://github.com/taylorhakes/fecha)

### Advice For Upgrade

1. Change all GM namespaces to F2
2. Replace `intervalStack`, `intervalDodge`, `areaStack` with `.adjust()`
3. Check if there is timeCat and modify the mask accordingly.
4. Change the interface of animate
5. Although F2's Shape interface is compatible with G2-mobile, it is advised to use the new interface.

## From F2 3.0 to F2 3.1

The followings are the main different between F2 3.1 and previous version:

1. The types of parameters in chart.guide()`  have changed. For more details, see [Guide API](../api/guide.html)
2. The underlying graphic engine has been reformed, all methods in the original F2.G have been completely abandoned, the usage of new version of G is listed in [Graphic API](../api/graphic.html)
3. Animation interfaces have changed, see [Animation API](../api/animation.html) for more details.