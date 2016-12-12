interface Window {
  __untochedPresCenterConfigVarName__: string;
  __inhabitWidgetInfoMessagesStorageKey: string;
}


function inhabitWidgetInfoPushToStorage(storageKey: string, item: any) {
  'use strict';
  let storageData = window.localStorage.getItem(storageKey) || '[]';
  let data = JSON.parse(storageData);
  data.push(item);
  window.localStorage.setItem(storageKey, JSON.stringify(data));
}

function inhabitWidgetInfoAddEventHandlers(emitter: any) {
  'use strict';
  window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, '[]');
  emitter.on('presenter.module.empty.list', function (appId) {
    let data = {
      time: Date.now(),
      evt: 'presenter.module.empty.list',
      appId: appId,
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('app.config.fetch.failure', function (appId, err) {
    let data = {
      time: Date.now(),
      evt: 'app.config.fetch.failure',
      appId: appId,
      err: err
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('app.config.fetch.success', function (appId, appConfig) {
    let data = {
      time: Date.now(),
      evt: 'app.config.fetch.success',
      appId: appId
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
    window[window.__untochedPresCenterConfigVarName__] = JSON.parse(JSON.stringify(appConfig)); // hacky but deep copy
  });
  emitter.on('presenter.module', function (appId, module, moduleConfig) {
    let data = {
      time: Date.now(),
      evt: 'presenter.module',
      appId: appId,
      modId: moduleConfig.id,
      modIndx: moduleConfig.moduleIndex
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('presenter.content', function (appId, module) {
    let data = {
      time: Date.now(),
      evt: 'presenter.content',
      appId: appId,
      modId: module.configuration.id,
      modIndx: module.configuration.moduleIndex
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('presenter.no.content', function (appId, module) {
    let data = {
      time: Date.now(),
      evt: 'presenter.no.content',
      appId: appId,
      modId: module.configuration.id,
      modIndx: module.configuration.moduleIndex
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('presenter.error', function (msg) {
    let data = {
      time: Date.now(),
      evt: 'presenter.error',
      err: msg
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
    let data = {
      time: Date.now(),
      evt: 'presenter.module.getcontent.error',
      appId: appId,
      modId: module.configuration.id,
      modIndx: module.configuration.moduleIndex,
      err: err
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
  emitter.on('presenter.module.demand.error', function (appId, moduleCfg, err) {
    let data = {
      time: Date.now(),
      evt: 'presenter.module.demand.error',
      appId: appId,
      modId: moduleCfg.id,
      modIndx: moduleCfg.moduleIndex,
      err: err
    };
    inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
  });
}
