System.register(["angular2/core", "../../data.models/explanationLine.model"], function (exports_1, context_1) {
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
    var core_1, explanationLine_model_1, MessagesExplanator;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (explanationLine_model_1_1) {
                explanationLine_model_1 = explanationLine_model_1_1;
            }
        ],
        execute: function () {
            MessagesExplanator = (function () {
                function MessagesExplanator() {
                    this.expLineFailure = explanationLine_model_1.ExplanationLine.TYPE_FAILURE;
                    this.expLineSuccess = explanationLine_model_1.ExplanationLine.TYPE_SUCCESS;
                    this.expLineWarning = explanationLine_model_1.ExplanationLine.TYPE_WARNING;
                }
                MessagesExplanator.prototype.presenterModuleExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    if (msg.modId) {
                        expLine.text += " getting module " + msg.modId;
                    }
                    if (msg.modIndx) {
                        expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
                    }
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_DEFAULT;
                    return expLine;
                };
                MessagesExplanator.prototype.presenterContentExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    if (msg.modId) {
                        expLine.text += " for the module " + msg.modId;
                    }
                    if (msg.modIndx) {
                        expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
                    }
                    expLine.text += " content found.";
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_SUCCESS;
                    return expLine;
                };
                MessagesExplanator.prototype.presenterNoContentExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    if (msg.modId) {
                        expLine.text += " for the module " + msg.modId;
                    }
                    if (msg.modIndx) {
                        expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
                    }
                    expLine.text += " no content found.";
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_WARNING;
                    return expLine;
                };
                MessagesExplanator.prototype.presenterErrorExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    expLine.text += " got error";
                    if (msg.err) {
                        expLine.text += msg.err;
                    }
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_WARNING;
                    return expLine;
                };
                MessagesExplanator.prototype.presenterModuleGetcontentErrorExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    expLine.text += " failed to get content";
                    if (msg.modId) {
                        expLine.text += " for the module " + msg.modId;
                    }
                    if (msg.modIndx) {
                        expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
                    }
                    if (msg.err) {
                        expLine.text += " with error " + msg.err;
                    }
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_WARNING;
                    return expLine;
                };
                MessagesExplanator.prototype.presenterModuleDemandErrorExpl = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    if (msg.time) {
                        expLine.text += "On " + (new Date(msg.time)).toUTCString();
                    }
                    expLine.text += " failed to demand";
                    if (msg.modId) {
                        expLine.text += " the module " + msg.modId;
                    }
                    if (msg.modIndx) {
                        expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
                    }
                    if (msg.err) {
                        expLine.text += " with error " + msg.err;
                    }
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_WARNING;
                    return expLine;
                };
                MessagesExplanator.prototype.wtf = function (msg) {
                    var expLine = new explanationLine_model_1.ExplanationLine();
                    expLine.text = "Oops, something unexplainable here: " + JSON.stringify(msg);
                    expLine.type = explanationLine_model_1.ExplanationLine.TYPE_FAILURE;
                    return expLine;
                };
                Object.defineProperty(MessagesExplanator.prototype, "messages", {
                    set: function (msgs) {
                        var tmpExpLines = new Array();
                        for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
                            var msg = msgs_1[_i];
                            var newExpLine;
                            switch (msg.evt) {
                                case ('presenter.module'):
                                    newExpLine = this.presenterModuleExpl(msg);
                                    break;
                                case ('presenter.content'):
                                    newExpLine = this.presenterContentExpl(msg);
                                    break;
                                case ('presenter.no.content'):
                                    newExpLine = this.presenterNoContentExpl(msg);
                                    break;
                                case ('presenter.error'):
                                    newExpLine = this.presenterErrorExpl(msg);
                                    break;
                                case ('presenter.module.getcontent.error'):
                                    newExpLine = this.presenterModuleGetcontentErrorExpl(msg);
                                    break;
                                case ('presenter.module.demand.error'):
                                    newExpLine = this.presenterModuleDemandErrorExpl(msg);
                                    break;
                                default:
                                    newExpLine = this.wtf(msg);
                            }
                            tmpExpLines.push(newExpLine);
                        }
                        this.explanationLines = tmpExpLines;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return MessagesExplanator;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array),
                __metadata("design:paramtypes", [Array])
            ], MessagesExplanator.prototype, "messages", null);
            MessagesExplanator = __decorate([
                core_1.Component({
                    selector: 'inhabit-messages-explanator',
                    templateUrl: '/src/components/messages.explanator/messages.explanator.template.html',
                    properties: ['explanationLines', 'expLineFailure', 'expLineSuccess', 'expLineWarning']
                }),
                __metadata("design:paramtypes", [])
            ], MessagesExplanator);
            exports_1("MessagesExplanator", MessagesExplanator);
        }
    };
});
//# sourceMappingURL=messages.explanator.component.js.map