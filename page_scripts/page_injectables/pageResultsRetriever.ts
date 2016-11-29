//============ Utility Methods - move to module or, better, use lodash instead =======
var _ = {
    get : getByPath,
    has : hasByPath
};

function findObjectProperty(obj: Object, path:string, separator:string) {
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

function getByPath(obj: Object, path: string, defaultValue ? :any, separator = ".") {
    var foundProperty = findObjectProperty(obj, path, separator);
    if ( ! foundProperty ) {
        return defaultValue;
    }
    return foundProperty;
}

function hasByPath(obj: Object, path: string, separator = ".") {
    return  (findObjectProperty(obj, path, separator) != undefined);
}

//=============== Data Retrieval Methods =============================

function interactiveInhabitGetTextClassSrv(){
    if (!  _.has(window, '__ark_app__.apps.app.componentManager.instances.textClassificationService')){
        return null;
    }
    return _.get(window, '__ark_app__.apps.app.componentManager.instances.textClassificationService', '');
}

function interactiveInhabitGetConextUrlFromWidget() {
    var txtClassSrv = interactiveInhabitGetTextClassSrv();
    if (! txtClassSrv) {
        return "";
    }
    return txtClassSrv.currentUrl;
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
        var entity = {
            providerName: provider + '( ' + contextualUrl + ' )' ,
            results: []
        };
        var allInternalResults = _.get(data.val[provider], 'Entities,'+ contextualUrl, [], ",");
        for(var internalEntity of  allInternalResults)
        {
            for (var property in internalEntity) {
                entity.results.push (
                    { //equals SemanticEntity class structure
                        kind: property,
                        value: JSON.stringify(internalEntity[property])
                    });
            }
        }
        entities.push(entity);
    }

    return entities;
}

function collectEventMessages() {
    return [
        { type: "event1", msg: "event 1 message" },
        { type: "event2", msg: "event 2 message" },
        { type: "event3", msg: "event 3 message" },
    ]
}

function interactiveInhabitCollectResults(textClassificationCacheStorageKey) {
    var interactiveInhabitContextualUrl = interactiveInhabitGetConextUrlFromWidget();
    return {contUrl: interactiveInhabitContextualUrl,
            entities:  interactiveInhabitCollectSemanticEntities(interactiveInhabitContextualUrl, textClassificationCacheStorageKey),
            messages: collectEventMessages()
    };
}