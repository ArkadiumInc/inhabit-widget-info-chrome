System.register(["angular2/core", "./widget.semanticator/widget.semanticator.component", "./widget.explanator/widget.explanator.component", "./widget.messenger/widget.messenger.component", "./prescenter.config.dumper/prescenter.config.dumper.component", "../core/dataCollection.service"], function (exports_1, context_1) {
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
    var core_1, widget_semanticator_component_1, widget_explanator_component_1, widget_messenger_component_1, prescenter_config_dumper_component_1, dataCollection_service_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (widget_semanticator_component_1_1) {
                widget_semanticator_component_1 = widget_semanticator_component_1_1;
            },
            function (widget_explanator_component_1_1) {
                widget_explanator_component_1 = widget_explanator_component_1_1;
            },
            function (widget_messenger_component_1_1) {
                widget_messenger_component_1 = widget_messenger_component_1_1;
            },
            function (prescenter_config_dumper_component_1_1) {
                prescenter_config_dumper_component_1 = prescenter_config_dumper_component_1_1;
            },
            function (dataCollection_service_1_1) {
                dataCollection_service_1 = dataCollection_service_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(dataCollSrv) {
                    this.dataCollector = dataCollSrv;
                    this.reloadPage(null);
                }
                AppComponent.prototype.refreshData = function (event) {
                    if (this.dataCollector) {
                        this.dataCollector.refreshData();
                    }
                };
                AppComponent.prototype.reloadPage = function (event) {
                    if (this.dataCollector) {
                        this.dataCollector.refreshPage();
                    }
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'inhabit-widget-info',
                    templateUrl: '/src/components/src.component.template.html',
                    directives: [widget_semanticator_component_1.WidgetSemanticator, widget_explanator_component_1.WidgetExplanator, widget_messenger_component_1.WidgetMessenger, prescenter_config_dumper_component_1.PresCenterConfigDumper],
                    providers: [dataCollection_service_1.DataCollectionService]
                }),
                __metadata("design:paramtypes", [dataCollection_service_1.DataCollectionService])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=src.component.js.map