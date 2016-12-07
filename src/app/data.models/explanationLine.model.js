System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ExplanationLine;
    return {
        setters: [],
        execute: function () {
            ExplanationLine = (function () {
                function ExplanationLine() {
                    this.text = "";
                    this.type = ExplanationLine.TYPE_DEFAULT;
                }
                return ExplanationLine;
            }());
            exports_1("ExplanationLine", ExplanationLine);
            ExplanationLine.TYPE_DEFAULT = 0;
            ExplanationLine.TYPE_WARNING = 1;
            ExplanationLine.TYPE_FAILURE = 2;
            ExplanationLine.TYPE_SUCCESS = 3;
        }
    };
});
//# sourceMappingURL=explanationLine.model.js.map