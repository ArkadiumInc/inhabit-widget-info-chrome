window.__inhabitWidgetInfoMessagesStorageKey = "{{messagesLogStorageKey}}";
window.__untochedPresCenterConfigVarName__ = "{{presCenterConfigVarName}}";
window.__ark_app__ = window.__ark_app__ || {onload: []};
window.__ark_app__.onload.push(
  function (emitter) {
    if (!document.getElementById("{{scriptIdEventHandlers}}")) {
      var s = document.createElement('script');
      s.src = "{{scriptEventSrc}}";
      s.onload = function () {
        inhabitWidgetInfoAddEventHandlers(emitter);
      };
      document.body.insertBefore(s, document.body.firstChild);
    }
  }
);
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById("{{scriptIdCollectResults}}")) {
    var s = document.createElement('script');
    s.src = "{{scriptCollectSrc}}";
    document.body.insertBefore(s, document.body.firstChild);
  }
});
