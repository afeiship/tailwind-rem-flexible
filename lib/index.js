(function (window, document) {
  var rootElement = document.documentElement;
  var resizeTimeout;
  var mobileRE = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  var stdWidth = window.__TW_REM_STD_WIDTH__ || 390; // 标准宽度，默认390px
  var maxWidth = window.__TW_REM_MAX_WIDTH__ || 1280; // 最大宽度，默认1280px

  // 检测是否为移动设备
  function isMobileDevice() {
    return mobileRE.test(navigator.userAgent);
  }

  // 设置根元素字体大小
  function setRootFontSize() {
    var clientWidth = rootElement.clientWidth;

    if (clientWidth <= stdWidth) {
      rootElement.style.fontSize = '16px';
    } else {
      var width = Math.min(clientWidth, maxWidth);
      var fontSize = (width / stdWidth) * 16; // 基于 stdWidth 的标准尺寸
      rootElement.style.fontSize = fontSize + 'px';
    }
  }

  if (isMobileDevice()) {
    // 初始设置
    setRootFontSize();

    // 防抖 resize 事件
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setRootFontSize, 100);
    });

    // 处理页面显示缓存
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        setTimeout(setRootFontSize, 0);
      }
    });
  }

  // export setRootFontSize
  window.setRootFontSize = setRootFontSize;
  window.isMobileDevice = isMobileDevice;
})(window, document);
