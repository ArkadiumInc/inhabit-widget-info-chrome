if (!document.getElementById("{{scriptIdCollectResults}}")) {
  var s = document.createElement('script');
  s.src = "{{scriptSrcCollectResults}}";
  document.body.appendChild(s);
}
interactiveInhabitCollectResults("{{textClassificationCacheStorageKey}}", "{{messagesLogStorageKey}}");
