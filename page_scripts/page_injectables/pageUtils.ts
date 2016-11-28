declare module "pageUtils" {
    export var _ = {
        get : getByPath,
        has : hasByPath
    };

    function findObjectProperty(obj: Object, path:string) {
        if (! (path instanceof String)) {
            return;
        }
        var propertyNames = path.split(".");
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

    function getByPath(obj: Object, path: string, defaultValue ? :any) {
        var foundProperty = findObjectProperty(obj, path);
        if ( ! foundProperty ) {
            return defaultValue;
        }
        return foundProperty;
    }

    function hasByPath(obj: Object, path: string) {
        return findObjectProperty(obj, path) === undefined;
    }

}
