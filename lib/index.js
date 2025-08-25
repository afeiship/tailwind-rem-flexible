(function (window, document) {
  var rootElement = document.documentElement;
  var resizeTimeout;
  var mobileRE = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  // 可配置参数
  var stdWidth = window.__TW_REM_STD_WIDTH__ || 390; // 标准设计稿宽度
  var minWidth = window.__TW_REM_MIN_WIDTH__ || 320; // 最小允许宽度（防止字体过小）
  var maxWidth = window.__TW_REM_MAX_WIDTH__ || 1280; // 最大允许宽度

  // 检测是否为移动设备
  function isMobileDevice() {
    return mobileRE.test(navigator.userAgent);
  }

  // 设置根元素字体大小
  function setRootFontSize() {
    var clientWidth = rootElement.clientWidth;

    // 限制有效宽度在 [minWidth, maxWidth] 范围内
    var effectiveWidth = Math.min(Math.max(clientWidth, minWidth), maxWidth);

    // 基于标准宽度计算 rem 基准
    var fontSize = (effectiveWidth / stdWidth) * 16;

    rootElement.style.fontSize = fontSize + 'px';

    window.REM = fontSize; // 可选：将当前 rem 基准暴露到全局，便于调试
  }

  // 只在移动端启用适配
  if (isMobileDevice()) {
    // 初始设置
    setRootFontSize();

    // 防抖 resize
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setRootFontSize, 100);
    });

    // 处理页面缓存（如返回缓存页面）
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        setTimeout(setRootFontSize, 0);
      }
    });
  }

  // 导出方法供外部调用
  window.setRootFontSize = setRootFontSize;
  window.isMobileDevice = isMobileDevice;
})(window, document);
