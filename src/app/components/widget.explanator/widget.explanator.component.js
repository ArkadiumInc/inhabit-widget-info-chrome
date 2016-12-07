System.register(["angular2/core", "../../core/dataCollection.service", "../semantic.entity.explanator/semantic.entity.explanator.component", "../messages.explanator/messages.explanator.component"], function (exports_1, context_1) {
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
    var core_1, dataCollection_service_1, semantic_entity_explanator_component_1, messages_explanator_component_1, WidgetExplanator;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dataCollection_service_1_1) {
                dataCollection_service_1 = dataCollection_service_1_1;
            },
            function (semantic_entity_explanator_component_1_1) {
                semantic_entity_explanator_component_1 = semantic_entity_explanator_component_1_1;
            },
            function (messages_explanator_component_1_1) {
                messages_explanator_component_1 = messages_explanator_component_1_1;
            }
        ],
        execute: function () {
            WidgetExplanator = (function () {
                function WidgetExplanator(dataCollSrv) {
                    this.dataCollector = dataCollSrv;
                    this.contentShown = true;
                    var thisObj = this;
                    if (this.dataCollector) {
                        this.dataCollector.stateChanges$.subscribe(function (msg) {
                            thisObj.onDataCollected(msg);
                        });
                    }
                }
                WidgetExplanator.prototype.fetchModulesFromConfig = function (config) {
                    var retVal = [];
                    if (config instanceof Array &&
                        config.length > 0) {
                        if (config[0].cfg &&
                            config[0].cfg.modules &&
                            config[0].cfg.modules instanceof Array) {
                            config[0].cfg.modules.map(function (module) {
                                retVal.push(module.id);
                            });
                        }
                    }
                    return retVal;
                };
                WidgetExplanator.prototype.onDataCollected = function (msg) {
                    if (msg.startsWith("data.refresh.")) {
                        this.contentLoading = false;
                        var entities = this.dataCollector.getEnitities();
                        if (entities instanceof Array &&
                            entities.length > 0) {
                            this.explanatorSemanticTopEntities = entities.slice(0, 5);
                        }
                        else {
                            this.explanatorSemanticTopEntities = [];
                        }
                        this.explanatorMessages = this.dataCollector.getMessages();
                        this.explanatorContextUrl = this.dataCollector.getContextUrl();
                        this.explanatorModules = this.fetchModulesFromConfig(this.dataCollector.getPresCenterConfig());
                    }
                    if (msg == "data.loading") {
                        this.contentLoading = true;
                    }
                };
                WidgetExplanator.prototype.toggleExpanding = function ($event) {
                    this.contentShown = !this.contentShown;
                };
                return WidgetExplanator;
            }());
            WidgetExplanator = __decorate([
                core_1.Component({
                    selector: 'inhabit-widget-explanator',
                    templateUrl: '/src/components/widget.explanator/widget.explanator.template.html',
                    directives: [semantic_entity_explanator_component_1.SemtanticEntityExplanator, messages_explanator_component_1.MessagesExplanator],
                    properties: ['explanatorSemanticEntitiy', 'explanatorMessages', 'explanatorContextUrl', 'explanatorModules',
                        'contentShown', 'contentExists', 'contentLoading']
                }),
                __metadata("design:paramtypes", [dataCollection_service_1.DataCollectionService])
            ], WidgetExplanator);
            exports_1("WidgetExplanator", WidgetExplanator);
        }
    };
});
//# sourceMappingURL=widget.explanator.component.js.map