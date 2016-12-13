if (!document.getElementById("{{scriptIdCollectResults}}")) {
  s.src = "{{scriptSrcCollectResults}}";
  document.body.appendChild(s);
}
interactiveInhabitCollectResults("{{textClassificationCacheStorageKey}}", "{{messagesLogStorageKey}}");
