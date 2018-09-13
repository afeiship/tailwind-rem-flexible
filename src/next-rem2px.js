(function () {

  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var document = global.document;
  var rootEl = document.getElementByTagName('html')[0];

  nx.rem2px = function (inValue) {
    var value = parseFloat(inValue) || 0;
    var percent = rootEl.dataset.percent;
    return value * percent;
  };


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.rem2px;
  }

}());
