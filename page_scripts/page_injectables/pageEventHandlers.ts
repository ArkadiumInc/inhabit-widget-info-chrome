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
    console.log("INHABIT INFO : Adding event hanlders on onLoad event and cleaning up message storage.");
    window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, []);
    emitter.on('presenter.module', function (appId, module, moduleConfig) {
        console.log("INHABIT INFO : presenter.module " + window.__inhabitWidgetInfoMessagesStorageKey);
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
        console.log("INHABIT INFO : presenter.content " + window.__inhabitWidgetInfoMessagesStorageKey);
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
        console.log("INHABIT INFO : presenter.no.content " + window.__inhabitWidgetInfoMessagesStorageKey);
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
        console.log("INHABIT INFO : presenter.error " + window.__inhabitWidgetInfoMessagesStorageKey);
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,
            {
                time: Date.now(),
                evt: 'presenter.error',
                err : msg
            });
    });
    emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
        console.log("INHABIT INFO : presenter.module.getcontent.error " + window.__inhabitWidgetInfoMessagesStorageKey);
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
        console.log("INHABIT INFO : presenter.module.demand.error " + window.__inhabitWidgetInfoMessagesStorageKey);
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
