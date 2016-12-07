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
    var core_1, dataCollection_service_1, WidgetMessenger;
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
            WidgetMessenger = (function () {
                function WidgetMessenger(dataCollSrv) {
                    this.dataCollector = dataCollSrv;
                    var thisObj = this;
                    if (this.dataCollector) {
                        this.dataCollector.stateChanges$.subscribe(function (msg) {
                            thisObj.onDataCollected(msg);
                        });
                    }
                }
                WidgetMessenger.prototype.onDataCollected = function (msg) {
                    if (msg.startsWith("data.refresh.")) {
                        this.contentLoading = false;
                        this.messages = this.dataCollector.getMessages();
                    }
                    if (msg == "data.loading") {
                        this.contentLoading = true;
                    }
                };
                WidgetMessenger.prototype.toggleExpanding = function ($event) {
                    this.contentShown = !this.contentShown;
                };
                WidgetMessenger.prototype.getProperties = function (message) {
                    return Object.keys(message);
                };
                return WidgetMessenger;
            }());
            WidgetMessenger = __decorate([
                core_1.Component({
                    selector: 'inhabit-widget-messenger',
                    templateUrl: '/src/components/widget.messenger/widget.messenger.template.html',
                    properties: ['messages']
                }),
                __metadata("design:paramtypes", [dataCollection_service_1.DataCollectionService])
            ], WidgetMessenger);
            exports_1("WidgetMessenger", WidgetMessenger);
        }
    };
});
//# sourceMappingURL=widget.messenger.component.js.map