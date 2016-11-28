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

var results = {
    entities: []
};

var widgetContextualUrl = (function getConextUrlFromWidget() {
    return "https://en.wikipedia.org/wiki/Tom_Cruise";
    if (! _.has(window, '__ark_app__') ) {
            console.warn("Inhabit Widget not found.");
            return null;
    }

    if (! _.has (window,'__ark_app__.apps.app.context.configAttr.contextualUrl')) {
            console.warn("Inhabit Widget does exist, but not properly configured to read the contextual URL.");
            return null;
    }

    return _.get (window, '__ark_app__.apps.app.context.configAttr.contextualUrl', '');
})();

(function collectSemanticResults(contextualUrl) {
    var cacheValueName = "TextClassificationCache";
    var cacheData = window.localStorage.getItem(cacheValueName) || "{}";
    var data = JSON.parse(cacheData);
    if (! contextualUrl ||
        ! data.val) {
        return;
    }
    for (var provider in data.val) {
        var entity = {
            providerName: provider + '( ' + contextualUrl + ' )' ,
            results: []
        };
        var allResults = _.get(data.val[provider], 'Entities,'+ contextualUrl, [], ",");
        if (allResults instanceof Array &&
            allResults.length  > 1)
        {
            for (var property in allResults[0]) {
                entity.results.push (
                    { //equals SemanticEntity class structure
                        kind: property,
                        value: allResults[0][property]
                    });
            }
        }
        results.entities.push(entity);
    }
})(widgetContextualUrl);

//The last evaluated line of the script is passed back to executeScript callback as return value
results
