//default value for the global var, should be overriden during initialization
function inhabitWidgetInfoPushToStorage(storageKey, item) {
    "use strict";
    var storageData = window.localStorage.getItem(storageKey) || "[]";
    var data = JSON.parse(storageData);
    data.push(item);
    window.localStorage.setItem(storageKey,JSON.stringify(data));
}

function inhabitWidgetInfoAddEventHandlers(emitter) {
    "use strict";
    window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, []);
    emitter.on('presenter.module', function (appId, module, moduleConfig) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: "presenter.module",
                appId : appId,
                modId : moduleConfig.id,
                modIndx : moduleConfig.moduleIndex
            });
    });
    emitter.on('presenter.content', function (appId, module) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.content',
                appId : appId,
                modId : module.configuration.id,
                modIndx : module.configuration.moduleIndex
            });
    });
    emitter.on('presenter.no.content', function (appId, module) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.no.content',
                appId : appId,
                modId : module.configuration.id,
                modIndx : module.configuration.moduleIndex
            });
    });
    emitter.on('presenter.error', function (msg) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.error',
                err : msg
            });
    });
    emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.module.getcontent.error',
                appId : appId,
                modId : module.configuration.id,
                modIndx : module.configuration.moduleIndex,
                err: err
            });
    });
    emitter.on('presenter.module.demand.error', function (appId, moduleCfg, err) {
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.module.demand.error',
                appId : appId,
                modId : moduleCfg.id,
                modIndx : moduleCfg.moduleIndex,
                err: err
            });
    });
}
