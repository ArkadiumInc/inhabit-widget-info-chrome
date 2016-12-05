//============ Utility Methods - move to module or, better, someway attach lodash instead =======
var _inhabitWidgetInfoOnLoad = {
    get : interactiveInhabitGetByPath,
    has : interactiveInhabitHasByPath,
};

function interactiveInhabitFindObjectProperty(obj: Object, path:string, separator:string) {
    if (! path) {
        return;
    }
    var propertyNames = path.split( separator );
    if (!(propertyNames instanceof Array)) {
        return;
    }
    var property = obj;
    for (var propertyName of propertyNames) {
        property = property[propertyName];
        if (! property) {
            return;
        }
    }
    return property;
}

function interactiveInhabitGetByPath(obj: Object, path: string, defaultValue ? :any, separator = ".") {
    var foundProperty = interactiveInhabitFindObjectProperty(obj, path, separator);
    if ( ! foundProperty ) {
        return defaultValue;
    }
    return foundProperty;
}

function interactiveInhabitHasByPath(obj: Object, path: string, separator = ".") {
    return  (interactiveInhabitFindObjectProperty(obj, path, separator) != undefined);
}

//============= Actions to execute during onLoad event handler==================

function inhabitWidgetInfoPushToStorage(storageKey, item) {
    "use strict";
    var storageData = window.localStorage.getItem(storageKey) || "[]";
    var data = JSON.parse(storageData);
    data.push(item);
    window.localStorage.setItem(storageKey,JSON.stringify(data));
}

function inhabitWidgetInfoGrabUntochedPresCenterConfig() {
    var generalConfig  = _inhabitWidgetInfoOnLoad.get(window, '__ark_app__.apps.app.config.config', '');
    if (generalConfig instanceof Array) {
        generalConfig.map(function(confEntry) {
            if (confEntry.id == "contentPresenter") {
                window[window.__untochedPresCenterConfigVarName__] =  JSON.stringify(confEntry.cfg);
            }
        })
    }
}

function inhabitWidgetInfoAddEventHandlers(emitter) {
    "use strict";
    window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, []);
    inhabitWidgetInfoGrabUntochedPresCenterConfig();
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
