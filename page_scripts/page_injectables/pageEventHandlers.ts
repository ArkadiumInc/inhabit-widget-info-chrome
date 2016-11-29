(function(){
    "use strict";
    window.__ark_app__ = window.__ark_app__ || {};
    window.__ark_app__.onload = function (emitter) {
        emitter.on('presenter.module', function (appId, module, moduleConfig) {
            console.log('TEST: presenter.module for app '+ appId + ' got module: ' + module.moduleName + ' module index ' + moduleConfig.moduleIndex);
        });
        emitter.on('presenter.content', function (appId, module) {
            console.log('TEST: presenter.content for app '+ appId + ' got content for module: ' + module.configuration.id +  ' module index ' + module.configuration.moduleIndex);
        });
        emitter.on('presenter.no.content', function (appId, module) {
            console.log('TEST: presenter.no.content for app '+ appId + ' got NO content for the module: ' + module.configuration.id +  ' module index ' + module.configuration.moduleIndex);
        });
        emitter.on('presenter.error', function (msg) {
            console.log('TEST: presenter.error : ' + msg);
        });
        emitter.on('presenter.module.getcontent.error', function (appId, module, err) {
            console.log('TEST: presenter.module.getcontent.error for app '+ appId +' presenter module getContent error: ' + module.configuration.id + ' error : ' + err);
        });
        emitter.on('presenter.module.demand.error', function (appId, moduleCfg, err) {
            console.log('TEST: presenter.module.demand.error for app '+ appId +' presenter module demanding error: ' + moduleCfg.id + ' error : ' + err);
        });
    };

    console.log("documentStart injectable script");
})();
