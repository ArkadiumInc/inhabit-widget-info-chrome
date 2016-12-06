//============ Utility Methods - move to module or, better, someway attach lodash instead =======
var _inhabitWidgetInfoOnLoad = {
    get : inhabitWidgetGetByPath,
    has : inhabitWidgetHasByPath,
};

function inhabitWidgetFindObjectProperty(obj: Object, path:string, separator:string) {
    if (! path) {
        return;
    }
    var propertyNames = path.split( separator );
    if (!(propertyNames instanceof Array)) {
        return;
    }
    var property:any = obj;
    for (var propertyName of propertyNames) {
        property = property[propertyName];
        if (! property) {
            return;
        }
    }
    return property;
}

function inhabitWidgetGetByPath(obj: Object, path: string, defaultValue ? :any, separator:string = ".") {
    var foundProperty = inhabitWidgetFindObjectProperty(obj, path, separator);
    if ( ! foundProperty ) {
        return defaultValue;
    }
    return foundProperty;
}

function inhabitWidgetHasByPath(obj: Object, path: string, separator:string = ".") {
    return  (inhabitWidgetFindObjectProperty(obj, path, separator) != undefined);
}

//============= Actions to execute during onLoad event handler==================

interface Window {
    __untochedPresCenterConfigVarName__: string;
    __inhabitWidgetInfoMessagesStorageKey : string;
}


function inhabitWidgetInfoPushToStorage(storageKey:string, item:any) {
    "use strict";
    var storageData = window.localStorage.getItem(storageKey) || "[]";
    var data = JSON.parse(storageData);
    data.push(item);
    window.localStorage.setItem(storageKey,JSON.stringify(data));
}

function inhabitWidgetInfoGrabUntochedPresCenterConfig() {
    var generalConfig:any[]  = _inhabitWidgetInfoOnLoad.get(window, '__ark_app__.apps.app.config.config', '');
    var configVarName:string = window.__untochedPresCenterConfigVarName__;
    if (generalConfig instanceof Array) {
        generalConfig.map(function(confEntry:any) {
            if (confEntry.id == "contentPresenter") {
                window[configVarName] =  JSON.stringify(confEntry.cfg);
            }
        })
    }
}

function inhabitWidgetInfoAddEventHandlers(emitter:any) {
    "use strict";
    window.localStorage.setItem(window.__inhabitWidgetInfoMessagesStorageKey, '[]');
    inhabitWidgetInfoGrabUntochedPresCenterConfig();
    emitter.on('presenter.module', function (appId, module, moduleConfig) {
        var data = {
            time: Date.now(),
            evt: "presenter.module",
            appId : appId,
            modId : moduleConfig.id,
            modIndx : moduleConfig.moduleIndex
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.content', function (appId, module) {
        var data = {
            time: Date.now(),
            evt: 'presenter.content',
            appId : appId,
            modId : module.configuration.id,
            modIndx : module.configuration.moduleIndex
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,data);
    });
    emitter.on('presenter.no.content', function (appId, module) {
        var data = {
            time: Date.now(),
            evt: 'presenter.no.content',
            appId : appId,
            modId : module.configuration.id,
            modIndx : module.configuration.moduleIndex
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.error', function (msg) {
        var data =             {
            time: Date.now(),
            evt: 'presenter.error',
            err : msg
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
    emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
        var data = {
            time: Date.now(),
            evt: 'presenter.module.getcontent.error',
            appId : appId,
            modId : module.configuration.id,
            modIndx : module.configuration.moduleIndex,
            err: err
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey,data);
    });
    emitter.on('presenter.module.demand.error', function (appId, moduleCfg, err) {
        var data = {
            time: Date.now(),
            evt: 'presenter.module.demand.error',
            appId : appId,
            modId : moduleCfg.id,
            modIndx : moduleCfg.moduleIndex,
            err: err
        };
        inhabitWidgetInfoPushToStorage( window.__inhabitWidgetInfoMessagesStorageKey, data);
    });
}
