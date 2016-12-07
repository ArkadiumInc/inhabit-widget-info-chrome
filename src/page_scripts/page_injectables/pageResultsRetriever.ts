//============ Utility Methods - move to module or, better, someway attach lodash instead =======

var _interactiveInhabit = {
    get : interactiveInhabitGetByPath,
    has : interactiveInhabitHasByPath
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

//=============== Data Retrieval Methods =============================

interface Window {
  __untochedPresCenterConfigVarName__: string;
}

function interactiveInhabitGetTextClassSrv(){
    if (!  _interactiveInhabit.has(window, '__ark_app__.apps.app.componentManager.instances.textClassificationService')){
        return null;
    }
    return _interactiveInhabit.get(window, '__ark_app__.apps.app.componentManager.instances.textClassificationService', '');
}

function interactiveInhabitGetConextUrlFromWidget() {
    var txtClassSrv = interactiveInhabitGetTextClassSrv();
    if (! txtClassSrv) {
        return "";
    }
    return txtClassSrv.currentUrl;
}

function interactiveInhabitGetPresCenterConfig () {
    if (window.__untochedPresCenterConfigVarName__) {
        return _interactiveInhabit.get(window, window.__untochedPresCenterConfigVarName__, "[]");
    }
    return "[]";
}

function interactiveInhabitCollectSemanticEntities(contextualUrl, textClassificationCacheStorageKey) {
    var entities = [];
    var cacheData = window.localStorage.getItem(textClassificationCacheStorageKey) || "{}";
    var data = JSON.parse(cacheData);
    if (! contextualUrl ||
        ! data.val) {
        return entities;
    }
    for (var provider in data.val) {
        var allInternalResults = _interactiveInhabit.get(data.val[provider], 'Entities,'+ contextualUrl, [], ",");
        for(var internalEntity of  allInternalResults)
        {
            var entity = {
                providerName: provider,
                results: []
            };
            for (var property in internalEntity) {
                entity.results.push (
                    { //equals SemanticEntity class structure
                        kind: property,
                        value: JSON.stringify(internalEntity[property])
                    });
            }
            entities.push(entity);
        }
    }

    return entities;
}

function interactiveInhabitCollectEventMessages(messageLogStorageKey) {
    var storageData = window.localStorage.getItem(messageLogStorageKey) || "[]";
    return JSON.parse(storageData);
}

function interactiveInhabitCollectResults(textClassificationCacheStorageKey, messageLogStorageKey) {
    var interactiveInhabitContextualUrl = interactiveInhabitGetConextUrlFromWidget();
    return {contUrl: interactiveInhabitContextualUrl,
            entities:  interactiveInhabitCollectSemanticEntities(interactiveInhabitContextualUrl, textClassificationCacheStorageKey),
            messages: interactiveInhabitCollectEventMessages(messageLogStorageKey),
            presCntCnf: interactiveInhabitGetPresCenterConfig ()
    };
}
