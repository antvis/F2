import { jsx } from '../../../src';

export default (props) => {
  const {
    delay = 500,
    images,
    easing = 'quinticOut',
    duration = 500,
    interval = 10,
    leave = true,
  } = props;
  return (
    <group>
      {images.map((image, i) => {
        return (
          <image
            key={image.src}
            cacheImage={true}
            attrs={{
              src: image.src,
              width: image.w,
              height: image.h,
              x: image.end.x,
              y: image.end.y,
              fillOpacity: 1,
            }}
            animation={{
              appear: {
                easing,
                delay: delay + i * interval,
                duration,
                property: ['x', 'y', 'fillOpacity'],
                start: {
                  x: image.start.x,
                  y: image.start.y,
                  // fillOpacity: 0,
                },
                end: {
                  x: image.end.x,
                  y: image.end.y,
                  fillOpacity: 1,
                },
              },
              leave: leave
                ? {
                    easing: 'quinticIn',
                    duration: 500,
                    property: ['x', 'y', 'fillOpacity'],
                    end: {
                      x: image.start.x,
                      y: image.start.y,
                      fillOpacity: 0,
                    },
                  }
                : null,
            }}
          />
        );
      })}
    </group>
  );
};
