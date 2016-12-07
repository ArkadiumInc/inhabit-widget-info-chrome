//============ Utility Methods - move to module or, better, someway attach lodash instead =======
var _interactiveInhabit = {
    get: interactiveInhabitGetByPath,
    has: interactiveInhabitHasByPath
};
function interactiveInhabitFindObjectProperty(obj, path, separator) {
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
function interactiveInhabitGetByPath(obj, path, defaultValue, separator) {
    if (separator === void 0) { separator = "."; }
    var foundProperty = interactiveInhabitFindObjectProperty(obj, path, separator);
    if (!foundProperty) {
        return defaultValue;
    }
    return foundProperty;
}
function interactiveInhabitHasByPath(obj, path, separator) {
    if (separator === void 0) { separator = "."; }
    return (interactiveInhabitFindObjectProperty(obj, path, separator) != undefined);
}
//=============== Data Retrieval Methods =============================
function interactiveInhabitGetTextClassSrv() {
    if (!_interactiveInhabit.has(window, '__ark_app__.apps.src.componentManager.instances.textClassificationService')) {
        return null;
    }
    return _interactiveInhabit.get(window, '__ark_app__.apps.src.componentManager.instances.textClassificationService', '');
}
function interactiveInhabitGetConextUrlFromWidget() {
    var txtClassSrv = interactiveInhabitGetTextClassSrv();
    if (!txtClassSrv) {
        return "";
    }
    return txtClassSrv.currentUrl;
}
function interactiveInhabitGetPresCenterConfig() {
    if (window.__untochedPresCenterConfigVarName__) {
        return _interactiveInhabit.get(window, window.__untochedPresCenterConfigVarName__, "[]");
    }
    return "[]";
}
function interactiveInhabitCollectSemanticEntities(contextualUrl, textClassificationCacheStorageKey) {
    var entities = [];
    var cacheData = window.localStorage.getItem(textClassificationCacheStorageKey) || "{}";
    var data = JSON.parse(cacheData);
    if (!contextualUrl ||
        !data.val) {
        return entities;
    }
    for (var provider in data.val) {
        var allInternalResults = _interactiveInhabit.get(data.val[provider], 'Entities,' + contextualUrl, [], ",");
        for (var _i = 0, allInternalResults_1 = allInternalResults; _i < allInternalResults_1.length; _i++) {
            var internalEntity = allInternalResults_1[_i];
            var entity = {
                providerName: provider,
                results: []
            };
            for (var property in internalEntity) {
                entity.results.push({
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
    return { contUrl: interactiveInhabitContextualUrl,
        entities: interactiveInhabitCollectSemanticEntities(interactiveInhabitContextualUrl, textClassificationCacheStorageKey),
        messages: interactiveInhabitCollectEventMessages(messageLogStorageKey),
        presCntCnf: interactiveInhabitGetPresCenterConfig()
    };
}
