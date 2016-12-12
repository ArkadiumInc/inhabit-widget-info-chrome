var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, Input } from '@angular/core';
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
export var SemanticTaxonomyExplanatorComponent = (function () {
    function SemanticTaxonomyExplanatorComponent() {
    }
    SemanticTaxonomyExplanatorComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(SemanticTaxonomyExplanatorComponent.prototype, "semanticTaxonomyData", {
        set: function (data) {
            var resValue = {};
            for (var _i = 0, _a = data.results; _i < _a.length; _i++) {
                var dataItem = _a[_i];
                resValue[dataItem] = JSON.parse(dataItem);
            }
            this.taxonomyData = resValue;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], SemanticTaxonomyExplanatorComponent.prototype, "taxonomyData", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', SemanticAnalyzeResult), 
        __metadata('design:paramtypes', [SemanticAnalyzeResult])
    ], SemanticTaxonomyExplanatorComponent.prototype, "semanticTaxonomyData", null);
    SemanticTaxonomyExplanatorComponent = __decorate([
        Component({
            selector: 'app-semantic-taxonomy-explanator,[app-semantic-taxonomy-explanator]',
            templateUrl: './semantic-taxonomy-explanator.component.html',
            styleUrls: ['./semantic-taxonomy-explanator.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SemanticTaxonomyExplanatorComponent);
    return SemanticTaxonomyExplanatorComponent;
}());
//# sourceMappingURL=D:/GIT/inhabit-widget-info-chrome/src/app/components/semantic-taxonomy-explanator/semantic-taxonomy-explanator.component.js.map