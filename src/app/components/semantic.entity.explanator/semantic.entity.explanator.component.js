System.register(["angular2/core", "../../data.models/semanticAnalyzeResult.model"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, semanticAnalyzeResult_model_1, SemtanticEntityExplanator;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (semanticAnalyzeResult_model_1_1) {
                semanticAnalyzeResult_model_1 = semanticAnalyzeResult_model_1_1;
            }
        ],
        execute: function () {
            SemtanticEntityExplanator = (function () {
                function SemtanticEntityExplanator() {
                }
                Object.defineProperty(SemtanticEntityExplanator.prototype, "semanticEntityData", {
                    set: function (data) {
                        //collecting propeties to local value first
                        // to avoid firing onChange event for the elements bound to entityData for every item added
                        var resValue = {};
                        for (var _i = 0, _a = data.results; _i < _a.length; _i++) {
                            var dataItem = _a[_i];
                            resValue[dataItem.kind] = JSON.parse(dataItem.value);
                        }
                        this.entityData = resValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return SemtanticEntityExplanator;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", semanticAnalyzeResult_model_1.SemanticAnalyzeResult),
                __metadata("design:paramtypes", [semanticAnalyzeResult_model_1.SemanticAnalyzeResult])
            ], SemtanticEntityExplanator.prototype, "semanticEntityData", null);
            SemtanticEntityExplanator = __decorate([
                core_1.Component({
                    selector: 'inhabit-semantic-entity-explanator',
                    templateUrl: '/src/components/semantic.entity.explanator/semantic.entity.explanator.template.html',
                    properties: ['entityData']
                }),
                __metadata("design:paramtypes", [])
            ], SemtanticEntityExplanator);
            exports_1("SemtanticEntityExplanator", SemtanticEntityExplanator);
        }
    };
});
//# sourceMappingURL=semantic.entity.explanator.component.js.map