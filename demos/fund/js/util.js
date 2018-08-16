  // 监听横竖屏
  window.addEventListener('orientationchange', function() {
    if (window.orientation === 180 || window.orientation === 0) {
      window.location.reload();
    }
    if (window.orientation === 90 || window.orientation === -90) {
      window.location.reload();
    }
  });
