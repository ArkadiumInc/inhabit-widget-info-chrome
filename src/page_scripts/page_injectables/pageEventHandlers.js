//============ Utility Methods - move to module or, better, someway attach lodash instead =======
var _inhabitWidgetInfoOnLoad = {
    get: inhabitWidgetGetByPath,
    has: inhabitWidgetHasByPath,
};
function inhabitWidgetFindObjectProperty(obj, path, separator) {
    if (!path) {
        return;
    }
    var propertyNames = path.split(separator);
    if (!(propertyNames instanceof Array)) {
        return;
    }
    var property = obj;
    for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
        var propertyName = propertyNames_1[_i];
        property = property[propertyName];
        if (!property) {
            return;
        }
    }
    return property;
}
function inhabitWidgetGetByPath(obj, path, defaultValue, separator) {
    if (separator === void 0) { separator = "."; }
    var foundProperty = inhabitWidgetFindObjectProperty(obj, path, separator);
    if (!foundProperty) {
        return defaultValue;
    }
    return foundProperty;
}
function inhabitWidgetHasByPath(obj, path, separator) {
    if (separator === void 0) { separator = "."; }
    return (inhabitWidgetFindObjectProperty(obj, path, separator) != undefined);
}
function inhabitWidgetInfoPushToStorage(storageKey, item) {
    "use strict";
    var storageData = window.localStorage.getItem(storageKey) || "[]";
    var data = JSON.parse(storageData);
    data.push(item);
    window.localStorage.setItem(storageKey, JSON.stringify(data));
}
function inhabitWidgetInfoGrabUntochedPresCenterConfig() {
    var generalConfig = _inhabitWidgetInfoOnLoad.get(window, '__ark_app__.apps.src.config.config', '');
    var configVarName = window.__untochedPresCenterConfigVarName__;
    if (generalConfig instanceof Array) {
        generalConfig.map(function (confEntry) {
            if (confEntry.id == "contentPresenter") {
                window[configVarName] = JSON.stringify(confEntry.cfg);
            }
        });
    }
}
function inhabitWidgetInfoAddEventHandlers(emitter) {
    "use strict";
    window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, '[]');
    inhabitWidgetInfoGrabUntochedPresCenterConfig();
    emitter.on('presenter.module', function (appId, module, moduleConfig) {
        var data = {
            time: Date.now(),
            evt: "presenter.module",
            appId: appId,
            modId: moduleConfig.id,
            modIndx: moduleConfig.moduleIndex
        };
        inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.content', function (appId, module) {
        var data = {
            time: Date.now(),
            evt: 'presenter.content',
            appId: appId,
            modId: module.configuration.id,
            modIndx: module.configuration.moduleIndex
        };
        inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.no.content', function (appId, module) {
        var data = {
            time: Date.now(),
            evt: 'presenter.no.content',
            appId: appId,
            modId: module.configuration.id,
            modIndx: module.configuration.moduleIndex
        };
        inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.error', function (msg) {
        var data = {
            time: Date.now(),
            evt: 'presenter.error',
            err: msg
        };
        inhabitWidgetInfoPushToStorage(window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
        var data = {
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
        var data = {
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