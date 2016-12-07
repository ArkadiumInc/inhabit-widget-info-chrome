System.register(["angular2/core", "../../core/dataCollection.service"], function (exports_1, context_1) {
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
    var core_1, dataCollection_service_1, PresCenterConfigDumper;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dataCollection_service_1_1) {
                dataCollection_service_1 = dataCollection_service_1_1;
            }
        ],
        execute: function () {
            PresCenterConfigDumper = (function () {
                function PresCenterConfigDumper(dataCollSrv) {
                    this.dataCollector = dataCollSrv;
                    var thisObj = this;
                    if (this.dataCollector) {
                        this.dataCollector.stateChanges$.subscribe(function (msg) {
                            thisObj.onDataCollected(msg);
                        });
                    }
                }
                PresCenterConfigDumper.prototype.onDataCollected = function (msg) {
                    if (msg.startsWith("data.refresh.")) {
                        this.contentLoading = false;
                        this.rawJson = JSON.stringify(this.dataCollector.getPresCenterConfig(), null, 4);
                    }
                    if (msg == "data.loading") {
                        this.contentLoading = true;
                    }
                };
                PresCenterConfigDumper.prototype.toggleExpanding = function ($event) {
                    this.contentShown = !this.contentShown;
                };
                return PresCenterConfigDumper;
            }());
            PresCenterConfigDumper = __decorate([
                core_1.Component({
                    selector: 'inhabit-prescenter-config-dumper',
                    templateUrl: '/src/components/prescenter.config.dumper/prescenter.config.dumper.template.html',
                    properties: ['rawJson',
                        'contentShown', 'contentExists', 'contentLoading']
                }),
                __metadata("design:paramtypes", [dataCollection_service_1.DataCollectionService])
            ], PresCenterConfigDumper);
            exports_1("PresCenterConfigDumper", PresCenterConfigDumper);
        }
    };
});
//# sourceMappingURL=prescenter.config.dumper.component.js.map