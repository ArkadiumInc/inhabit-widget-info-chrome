(function(){
    "use strict";
    window.addEventListener('presenter.module', function (appId, module, moduleConfig) {
        console.log('INHABIT INFO: For app '+ appId + ' got module: ' + module.moduleName + ' module index ' + moduleConfig.moduleIndex);
    });
    window.addEventListener('presenter.content', function (appId, module) {
        console.log('INHABIT INFO: For app '+ appId + ' got content for module: ' + module.configuration.id +  ' module index ' + module.configuration.moduleIndex);
    });
    window.addEventListener('presenter.no.content', function (appId, module) {
        console.log('INHABIT INFO: For app '+ appId + ' got NO content for the module: ' + module.configuration.id +  ' module index ' + module.configuration.moduleIndex);
    });
    window.addEventListener('presenter.error', function (msg) {
        console.log('INHABIT INFO: Presenter error: ' + msg);
    });
    window.addEventListener('presenter.module.getcontent.error', function (appId, module, err) {
        console.log('INHABIT INFO: For app '+ appId +' presenter module getContent error: ' + module.configuration.id + ' error : ' + err);
    });
    window.addEventListener('presenter.module.demand.error', function (appId, moduleCfg, err) {
        console.log('INHABIT INFO: For app '+ appId +' presenter module demanding error: ' + moduleCfg.id + ' error : ' + err);
    });

    var arkComponent = document.getElementById("ark-component-content-html");
    console.log("INHABIT INFO: element by id " + arkComponent);

    console.log("documentStart injectable script");
})();
